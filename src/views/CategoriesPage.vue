<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading"/>

    <div class="row" v-else>
      <CategoryCreate @createCategory= 'addCategory'></CategoryCreate>
      <CategoryEdit 
      v-if="categories.length"
      :key="categories.length + updateCount"
      :categories = "categories"
      @categoryUpdate = 'categoryUpdate'></CategoryEdit>
      <div class="center" v-else>Категорий пока нет, создайте их!</div>
    </div>
  </section>
</div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default{
  name: 'category',
  setup () {
    const siteData = reactive({
      title: 'Categories',
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
components:{
  CategoryCreate, CategoryEdit
},
data(){
  return{
    categories: [],
    loading: true,
    updateCount: 0,
  }
},
methods: {
    addCategory(category){
     this.categories.push(category);
  },
  categoryUpdate(category){
    const index = this.categories.findIndex(c => c.id === category.id)
    this.categories[index].name = category.name
    this.categories[index].limit = category.limit
    this.updateCount++

  }
},

 async mounted() {
  this.categories = await this.$store.dispatch('fetchCategories')
  this.loading = false
},

}
</script>