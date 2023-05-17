<template>
    <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{ getCurrency(info.bill) }}</h4>
  </div>

  <Loader v-if="loading"/>

 <p class = 'center'
  v-else-if="!categories.length"
  >Категорий пока что нет. Вы можете добавить их <router-link to="/categories">тут</router-link></p>

  <section v-else>
    <div v-for=" cat of categories" :key="cat.id">
      <p>
        <strong>{{ cat.name }}</strong>
        {{ getCurrency(cat.spend) }} из {{ getCurrency(cat.limit) }}
      </p>
      <div class="progress" v-tooltip="cat.tp">
        <div
            class="determinate" :class="[cat.color]"
            :style="{width: cat.progressPercent + '%'}"
        ></div>
      </div> 
    </div>
  </section>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default {
  name: 'planning',
  setup () {
    const siteData = reactive({
      title: 'Planning',
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
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records.filter(r => r.categoryId === cat.id)
      .filter(r => r.type == 'outcome')
      .reduce((all, record) =>{
        return all += +record.amount
      },0 )
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const color = percent < 60 
      ? 'green'
      :percent < 100
      ? 'yellow'
      :'red'

      const tpValue = cat.limit - spend
      const tp = `${tpValue < 0 ? 'Превышение на': 'Осталось'} ${this.getCurrency(Math.abs(tpValue))}`

      return {
        ...cat,
        progressPercent,
        color,
        spend,
        tp,

      }
    })

    this.loading = false
  },
  methods: {
   getCurrency(val){
    return new Intl.NumberFormat("ru", {style: "currency", currency: "RUB"}).format(val);
   }
  }

}
</script>