<template>
 <div class="app">
   <component :is="layout">
      <router-view/>
   </component>
</div>
</template>
<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
import MainLayout from '@/layouts/MainLayout.vue';
export default{
  setup () {
    const siteData = reactive({
      title: 'Main',
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
  computed: {
    layout(){
      return (this.$route.meta.layout || "empty") + '-layout';
    }
  },
  components: {
    EmptyLayout, MainLayout,
  }
  }

</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css'
</style>
