<template>
    <div class="app-main-layout">

  <NavBar @close="closeUP"/>
  
  <SideBar/>
  
  <main class="app-content" :class="{full: !this.$store.state.isOpen}">
      <div class="app-page">
            <router-view></router-view>

        </div>
    </main>

<div class="fixed-action-btn tooltipped" data-position="left" v-tooltip="'Создать запись'">
  <router-link to="/record" class="btn-floating btn-large blue">
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
</template>
<script>
import NavBar from '@/components/app/NavBar';
import SideBar from '@/components/app/SideBar';
import messages from '@/utils/messages'
export default {
  name: 'main-layout',
  components: {
    SideBar, NavBar
  },

    async mounted () {
      try{
        
    if(this.$store.getters.info ){
       await this.$store.dispatch('fetchInfo')
       console.log(this.$store.getters.info)
    }
    
  } catch(error){
    console.log(error)
  }
  },
  
  methods: {
    closeUP(){
      this.$store.commit("closeUP");
    }
  },
  computed:{
        error() {
            return this.$store.getters.error 
        }
    },
    watch: {
        error(firebaseError){
            console.log(firebaseError)
            this.$error(messages[firebaseError.code] || "Что-то пошло не так")
        }
    }
}
</script>
<style lang="scss" scoped>


</style>