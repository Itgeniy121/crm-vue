<template >
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Редактировать</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field" >
              <select ref="select" v-model="currenCategory">
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

            <div class="input-field">
              <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{invalid: (v$.name.required.$invalid == true && v$.name.$dirty == true)}"
                
                >
              
              <label for="name">Название</label>
              <span 
              v-if="v$.name.required.$invalid == true && v$.name.$dirty == true"
              class="helper-text invalid">
              Введите название
            </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: (v$.limit.required.$invalid == true && v$.limit.$dirty == true) || (v$.limit.minValue.$invalid == true )}"
              >
              <label for="limit">Лимит</label>
              <span class="helper-text invalid"
              v-if="v$.limit.required.$invalid == true && v$.limit.$dirty == true"
              >
              Установите лимит</span>
              <span class="helper-text invalid"
              v-else-if="v$.limit.minValue.$invalid == true"
              >
              Лимит должен быть больше 0</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  props:{
    categories:{
      type: Array,
      required: true,
    }
  },
  data: () => ({
    select: null,
    name: '',
    limit: ' ',
    currenCategory: null,
  }),
  validations () {
    return {
      name:{required},
      limit: {required, minValue: minValue(1)},
    }
  },
  watch:{
    currenCategory(Id){
       const {name, limit} = this.categories.find(c => c.id === Id)
       this.name = name
       this.limit = limit 
    }
  },
  created(){
     const {id, name, limit} = this.categories[0]
     this.currenCategory = id
     this.name = name
     this.limit = limit
  },
    methods:{
      async submitHandler(){
        if(this.v$.name.required.$invalid == false  && this.v$.limit.required.$invalid == false && this.v$.limit.minValue.$invalid == false){
        try {
           await this.$store.dispatch('updateCategory', {
            name: this.name,
            limit: this.limit,
            id: this.currenCategory
        })
        const Data = {
            name: this.name,
            limit: this.limit,
            id: this.currenCategory
        }
          this.$emit('categoryUpdate', Data )
           this.$message(` Категория"${this.name}" успешно обновлена ✔️`)
           this.v$.$reset()       
    } catch (error){
        console.log("ошибка в редактирвании категории CATCREATE");
        console.log(error)
    }
        } else {
     this.v$.$touch();
     return
    }
      }
    },
    mounted(){
      M.updateTextFields()
      this.select =  M.FormSelect.init(this.$refs.select);
    
    },
    destroyed() {
      if(this.select && this.select.destroy){
        this.select.destroy()
      }

    },
}
</script>
<style lang="">
    
</style>