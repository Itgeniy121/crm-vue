<template>
    <ul class="sidenav app-sidenav" :class="{open: this.$store.state.isOpen}" >

      <li v-for="link in links"
        :key="link.url"
        class = 'animation'
        :id="link.id"
        >
      <router-link
         :to="link.url"
         :exact = "link.exact">
        <a href="#" class="animation2">{{ link.title }}</a>
      </router-link>
    </li>
        
    </ul>
</template>
<script>

export default {
    data: () => ({
      links: [
        {title: 'Счёт', url: '/', exact: true, id: 'anim1'},
        {title: 'История', url: '/history',},
        {title: 'Планирование', url: '/planning',},
        {title: 'Новая запись', url: '/record',},
        {title: 'Категории', url: '/categories',},
      ]
    })

}
</script>
<style>
.animation{
  transition: 0.5s;
}
.animation:active{
 background: orange;
}
.animation2{
  color: gray;
}
.sidenav{
  width: 270px !important;
}
#anim1{
  margin-top: 60px;
}
</style>