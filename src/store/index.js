import { createStore } from 'vuex'
import auth from "./auth"
import info from './info'
import category from './category'
import recoed from './recoed'

const store = createStore({
  state(){
    return{
      isOpen: true,
      error: null,
    }
  },
  mutations:{
    closeUP(state){
      state.isOpen = !state.isOpen
    },
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = 0
    }
  },
  modules:{
    auth, info, category, recoed
  },
  getters: {
    error: s => s.error
  },
  actions: {
     async fetchCurrency(){
      const myHeaders = new Headers();
      myHeaders.append("apikey", "L9xwnELhm64A1HVHeZlVcBTLmY1JrPsn");

      var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
      const result = await fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=RUB,EUR,USD", requestOptions)
      return await result.json()

    }
  }

})
export default store;
