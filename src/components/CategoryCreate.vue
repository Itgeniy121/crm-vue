<template >
   <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Создать</h4>
          </div>

          <form @submit.prevent="submitHandler">
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
                  :class="{invalid: (v$.limit.required.$invalid == true && v$.limit.$dirty == true) || (v$.limit.minValue.$invalid == true && v$.limit.$dirty == true)}"
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
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
export default {
    setup () {
    return { v$: useVuelidate() }
  },

  data () {
    return {
      name: '',
      limit: '',
    }
  },
  validations () {
    return {
      name:{required},
      limit: {required, minValue: minValue(1)},
     
    }
  },

  methods:{
     async submitHandler(){
        if(this.v$.name.required.$invalid == false  && this.v$.limit.required.$invalid == false && this.v$.limit.minValue.$invalid == false){
        try {
            const category =  await this.$store.dispatch('createCategory', {
            name: this.name,
            limit: this.limit,
        })
        this.$message(`Вы создали категорию "${this.name}"✔️`)
        this.v$.$reset()
        this.name = ''
        this.limit = ''
        this.v$.$reset()
        this.$emit('createCategory', category)
    } catch (error){
        console.log("ошибка в создании категории CATCREATE");
    }
        } else {
     this.v$.$touch();
     return
    }
    }
  }
}
</script>
<style lang="">
    
</style>