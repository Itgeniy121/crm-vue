import { db,} from "@/main"
import { ref, set, get, push, child } from "firebase/database";
export default {
    actions: {
        async createRecord({dispatch, commit}, obj){
            try{
            const uid = await dispatch('getUid')
            const reference =  await ref(db, `users/${uid}/records/`)
             return push(reference, obj)
            
        }catch(error){
            commit('setError', error)
            throw error
        }
    },
    async fetchRecords({dispatch, commit}, ){
        try{
            const uid = await dispatch('getUid')
            const reference = ref(db, `users/${uid}/records/`)
            let records = (await get(reference)).val() || {}
            return Object.keys(records).map(key => ({...records[key], id: key}))
        }catch(error){
            commit('setError', error)
            throw error
        }
    },
    async fetchRecordById({dispatch, commit}, id ){
        try{
            const uid = await dispatch('getUid')
            let reference = ref(db, `users/${uid}/records/`)
            reference = child(reference, id)
            let record = (await get(reference)).val() || {}
            return {...record, id: id}
        }catch(error){
            commit('setError', error)
            throw error
        }
    }
}
}