<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent = "closeUp">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{date}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{ name }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text"  @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>

// import FormattedDate from "@/filters/formatDate";
export default {
  data: () => ({
    date: null,
    interval: null,
    dropdown: null,
  }),
    methods: {
      closeUp(){
        this.$emit('close');
      },
      async logout(){
       await this.$store.dispatch('logout')
        this.$router.push('/login?message=exit');
      }
    },
    mounted(){
       this.interval = setInterval(() =>{
        let formattedDate = new Date();
        this.date = formattedDate.toLocaleString();
      } , 1000)
       this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: true,
      })
    },
    created(){
      this.interval = setInterval(() =>{
        let formattedDate = new Date();
        this.date = formattedDate.toLocaleString();
      } , 1000)
       this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: true,
      })
    },
    beforeDestroy() {
      clearInterval(this.interval);
      if (this.dropdown && this.dropdown.destroy()){
        this.dropdown.destroy();
      }
    },
    computed:{
      name(){
        return this.$store.getters.info.name
      }
    }
}

</script>