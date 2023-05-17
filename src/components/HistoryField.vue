<template >
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(rec, index) in records" :key="rec.id">
        <td>{{ index + 1 }}</td>
        <td>{{ getCurrency(rec.amount) }}</td>
        <td>{{ getDate(rec.date) }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge red"
          :class="[rec.typeClass]"
          >{{ rec.typeText }}</span>
        </td>
        <td>
          <button 
          class="btn-small btn"
           @click="$router.push('/detailrec/' + rec.id)"
           v-tooltip="'Открыть запись'"
           >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
export default {
   props:{
    records: {
        required: true,
        type: Array,
    }
   },
   methods: {
   getCurrency(val){
    return new Intl.NumberFormat("ru", {style: "currency", currency: "RUB"}).format(val);
   },
   getDate(date){
     const newdate = new Date(date)
     return newdate.toLocaleDateString()
   }
  }
}
</script>
