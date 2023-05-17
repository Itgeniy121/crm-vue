<template>
    <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  
<Loader v-if="loading"/>

<div v-else class="row">
    
<HomeBill
:rates = 'currency.rates'
></HomeBill>
<HomeCurrency
:rates = 'currency.rates'
:date = 'currency.date'
></HomeCurrency>
    
  </div>
</div>
</template>
<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import { computed, reactive } from 'vue';
import {useHead} from "@vueuse/head"
export default {
  name: 'home',
 
  data:()=>({
    loading: true,
    currency: null,
  }),
components: {
  HomeBill, HomeCurrency,
},
async mounted(){
   this.currency = await this.$store.dispatch('fetchCurrency')
   console.log(this.currency)
   this.loading = false
 },
 methods: {
   async refresh(){
    this.loading = true;
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  }
 }
}
</script>