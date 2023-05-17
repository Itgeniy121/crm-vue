<template>
<div>
  <Loader v-if="loading"/>
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link  to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        <div v-if="record.type == 'outcome'">Расход</div>
        <div v-else="record.type == 'outcome'">Доход</div>
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="{green: record.type == 'income',
      red: record.type == 'outcome'
      }">
          <div class="card-content white-text">
            <p>Описание: {{ record.description }}</p>
            <p>Сумма: {{ record.amount }}</p>
            <p>Категория: {{ record.categoryName }}</p>

            <small>{{ getFormatDate(record.date) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class = 'center' v-else>Запись не найдена(</p>
</div>
</template>
<script>
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default {
  name: 'detail',
  setup () {
    const siteData = reactive({
      title: 'Current Record',
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
  data: () => ({
    record: null,
    category: null,
    loading: true,
  }),

  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategory', record.categoryId)
    this.category = category
    this.record = {
      ...record,
      categoryName: category.name,
    }
    
    this.loading = false;
  },

  methods: {
    getFormatDate(date){
      let newdate = new Date(date)
      return newdate.toLocaleString()
    }
  }

}

</script>