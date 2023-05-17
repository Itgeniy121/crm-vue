import { auth, db,} from "@/main"
import { ref, set, get, Database, update } from "firebase/database";
export default {
    state: {
        info:{

        },
    },

    getters: {
        info: s=> s.info
    },
        mutations: {
            setInfo(state, info){
                state.info = info
            },
            clearInfo(state){
                state.info = {}
            }
        },
        actions: {
            async fetchInfo({dispatch, commit}){
                try{
                const uid = await dispatch('getUid')
                const info = ref(db, `users/${uid}/info`)
                const resp =  (await get(info)).val()
                commit ('setInfo', resp)
                return resp
                } catch (error){
                    console.log(error)
                    console.log('ошибка в получение инфы')
                }
            },
            
            async updateBill({dispatch, commit, getters}, toUpdate){
                try{
                    const uid = await dispatch('getUid')
                    
                    const updateData = {...getters.info, ...toUpdate}
                    const info = ref(db, `users/${uid}/info/`)
                    set(info, updateData)
                    commit('setInfo', updateData)
                } catch(error){
                    commit('setError', error)
                    throw error
                }
            },
          
        },
    }

