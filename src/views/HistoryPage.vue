<template>
    <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
  <Loader v-if="loading"/>

  <p class = 'center'
  v-else-if="!records.length"
  >Записей пока что нет. Сделайте их <router-link to="/categories">тут</router-link></p>

  <section v-else>
    <HistoryField :records="items"/>

  <Paginate
  v-model="defaultPage"
  :pageCount="pageCount"
  :clickHandler="pageHandler"
  :prevText="'Назад'"
  :nextText="'Вперед'"
  :containerClass="'pagination'"
  :page-class="'waves-effect'"

>
</Paginate>
  </section>
</div>
</template>
<script>
import paginationMixin from "@/mixins/pagination.mixin"
import HistoryField from '@/components/HistoryField.vue'
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default {
  name: 'history',
  setup () {
    const siteData = reactive({
      title: 'History',
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
  components: {
    HistoryField,
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
}),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    
    this.loading = false

  },
  methods:{
    setup(categories){
      this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find((cat) => cat.id === record.categoryId).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'

      }
    }))

    }
  }
}

</script>