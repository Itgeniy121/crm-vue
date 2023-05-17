<template>
    <div>
  <div class="page-title">
    <h3>Профиль</h3>
  </div>

  <form class="form">
    <div class="input-field">
      <H6>Profile name: {{ name }}</H6>
      <h6>Balance: {{ balance }}</h6>

    <button class="btn waves-effect waves-light" type="submit" @click="logout">
      Выйти из аккаунта
      <i class="material-icons">assignment_return</i>
        </button>
    </div>
  </form>
</div>
</template>

<script>
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default{
  data() {
    return{
      name: null,
      balance: null,

    }
  },
  setup () {
    const siteData = reactive({
      title: 'My Profile',
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
   
  },
  async mounted ( ) {
    const info = await this.$store.dispatch('fetchInfo')
    this.name = info.name
    this.balance = info.bill
  },
  methods: {
    async logout(){
       await this.$store.dispatch('logout')
        this.$router.push('/login?message=exit');
      }
  },
}
</script>