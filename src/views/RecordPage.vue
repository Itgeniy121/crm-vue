<template>
    <div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <Loader v-if="loading"/>

  <p class = 'center'
  v-else-if="!categories.length"
  >Категорий пока что нет. Вы можете добавить их <router-link to="/categories">тут</router-link></p>

  <form class="form" v-else @submit.prevent="submitHandler"> 
    <div class="input-field" >
      <select ref="select" v-model="currentCategory">
        <option
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
                >
                {{ c.name }}
              </option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"    
                />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
      id="amount"
      type="number"
      v-model.trim="amount"
      :class="{invalid: (v$.amount.required.$invalid == true && v$.amount.$dirty == true) || (v$.amount.minValue.$invalid == true && v$.amount.$dirty == true) }"               
      >
      
      <label for="amount">Сумма</label>
      <span 
              v-if="v$.amount.required.$invalid == true && v$.amount.$dirty == true"
              class="helper-text invalid">
              Введите сумму
            </span>
            <span 
              v-else-if="v$.amount.minValue.$invalid == true" 
              class="helper-text invalid">
              Сумма должна быть больше 0
            </span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: (v$.description.required.$invalid == true && v$.description.$dirty == true)}"
      >
      <label for="description">Описание</label>
      <span 
        v-if="v$.description.required.$invalid == true && v$.description.$dirty == true"
        class="helper-text invalid">
        Задайте описание
      </span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default{
  name: 'record',
  setup () {
    const siteData = reactive({
      title: 'Record',
      description: "aboba"
    })
    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description)
        },
      ],
    })
    return { v$: useVuelidate() }

   
  },
  data:() => ({
    loading: true,
    categories: null,
    select: null,
    currentCategory: null,
    type: 'income',
    amount: null,
    description: null,
  }),
  validations () {
    return {
      amount:{required, minValue: minValue(1)},
      description: {required},
    }
  },
   async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if(this.categories.length){
      this.currentCategory = this.categories[0].id
    }

    setTimeout(() => {
      this.select =  M.FormSelect.init(this.$refs.select);
      M.updateTextFields()

    }, 0)
  },
  destroyed() {
      if(this.select && this.select.destroy){
        this.select.destroy()
      }

    },
    computed:{
      ...mapGetters(['info']),

        creaeHandler(){
          if(this.type === 'income'){
            return true
          }
          return this.info.bill >= this.amount
        }
    },
  methods:{
    async submitHandler(){
        if(this.v$.description.required.$invalid == false && (this.v$.amount.required.$invalid == false && this.v$.amount.minValue.$invalid == false)){
        try {
            if(this.creaeHandler){
               await this.$store.dispatch('createRecord', {
                categoryId: this.currentCategory,
                amount: this.amount,
                description: this.description,
                type: this.type,
                date: new Date().toJSON() 
              })
              let bill = null
              if(this.type === 'income'){
                bill = this.info.bill + this.amount
              } else {
                 bill = this.info.bill - this.amount
              }
              await this.$store.dispatch('updateBill', {bill})
              this.$message('Запись успешно создана')
              this.v$.$reset()
              this.amount = ''
              this.description = ''
            } else {
              this.$message(`Недостаточно средств (${this.amount - this.info.bill})`)
            }
    } catch (error){
        console.log("ошибка в добавлении категории CATCREATE");
        console.log(error)
    }
        } else {
     this.v$.$touch();
     return
    }
      }
  }
}
</script>