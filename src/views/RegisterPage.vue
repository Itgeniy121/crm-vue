<template>
    <form class="card auth-card" @submit.prevent="OnSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ((v$.email.required.$invalid == true && v$.email.$dirty == true) || (v$.email.email.$invalid == true && v$.email.$dirty == true)) }"
      >
      <label for="email">Email</label>
      <small 
      class="helper-text invalid"
      v-if="v$.email.required.$invalid == true && v$.email.$dirty == true"
      >Введите email</small>
      <small 
      class="helper-text invalid"
      v-else-if="v$.email.email.$invalid == true && v$.email.$dirty == true"
      >Введите корректный email</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ((v$.password.required.$invalid == true && v$.password.$dirty == true) || (v$.password.minLength.$invalid == true && v$.password.$dirty == true)) }" 
      
      >
      <label for="password">Пароль</label>
      <small 
      class="helper-text invalid"
      v-if="v$.password.required.$invalid == true && v$.password.$dirty == true"
      >Введите пароль</small>
      <small 
      class="helper-text invalid"
      v-else-if="password.length <= 5 && v$.password.$dirty == true"
      >Пароль должен содержать больше 5 символов</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.required.$invalid == true && v$.name.$dirty == true}"
      >
      <label for="name">Имя</label>
      <small 
      class="helper-text invalid"
      v-if="v$.name.required.$invalid == true && v$.name.$dirty == true"
      >Введите имя</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>С правилами согласен</span>
      </label>
    </p>
    <small 
      class="helper-text invalid"
      v-if="agree == false "
      >правил нет, жми галку</small>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>
<script>
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default {
    name: "login",
    setup() {
      const siteData = reactive({
      title: 'Registaration',
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
    data() {
        return {
            email: "",
            password: "",
            name: "",
            agree: false,
        };
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
            name: { required },
            agree: {checked: v => v}
        };
    },
    methods: {
         async OnSubmit() {
            if ((this.v$.email.email.$invalid == false && this.v$.email.required.$invalid == false) && (this.v$.password.required.$invalid == false && this.password.length > 5) && this.agree == true) {
                
              const DateInf = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                };
                
                try{
                  await this.$store.dispatch('register', DateInf)
                  this.$router.push("/");
                  
                
                } 
                catch (e){
                  console.log(e)
                }
                
            }
            else {

               
            }
        }
    },
    components: { router }
}
</script>