import { auth, db,} from "@/main"
import { ref, set, get, push, child } from "firebase/database";
export default {
    actions: {
        async createCategory({commit, dispatch}, {name, limit}){
            try{
                const uid = await dispatch('getUid')
                const category = ref(db, `users/${uid}/categories/`)
                     const categoryId =  push(category, {
                        name,
                        limit
                    })
                    
                return  {name, limit, id: categoryId.key }
            } catch(error){
                commit('setError', error)
                throw error
            }
        },
        async fetchCategories({commit, dispatch}){
            try{
                const uid = await dispatch('getUid')
                const reference = ref(db, `users/${uid}/categories/`)
                let allCategories = (await get(reference)).val() || {}
                return Object.keys(allCategories).map(key => ({...allCategories[key], id: key}))
            }catch (error){
                commit('setError', error)
                throw error
            }
        },

        async updateCategory({dispatch}, {id, name, limit}){
            try{
                const uid = await dispatch('getUid')
                const reference =  ref(db, `users/${uid}/categories/${id}`)
                set(reference, {name, limit, id})                
                
            }catch(error){
                console.log(error)
            }
        },
        async fetchCategory({commit, dispatch}, id){
            try{
                const uid = await dispatch('getUid')
                let reference = ref(db, `users/${uid}/categories/`)
                reference = child(reference, id)
                let category = (await get(reference)).val() || {}
                return {...category, id}
            }catch (error){
                commit('setError', error)
                throw error
            }
        },
    }
}