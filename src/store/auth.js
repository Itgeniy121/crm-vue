import { auth, db,} from "@/main"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { ref, set, get, Database } from "firebase/database";
export default {
    actions:{
            async login ({dispatch, commit}, {email, password}){
                try{
                     const xyi =  await signInWithEmailAndPassword(auth, email, password,);
                    
                } catch (error) {
                    commit('setError', error)
                    console.log('ошибка в логине')
                    throw error
                }
            },
            
            async register({dispatch, commit}, {email, password, name}){
                try{
                    await createUserWithEmailAndPassword(auth, email, password,);
                    const uid = await dispatch('getUid')
                    const reference = ref(db, `users/${uid}/info`)
                    set(reference, {
                        bill: 0,
                        name,
                        email,
                        password
                    })
 
                 
               } catch (error) {
                commit('setError', error)
                console.log('ошибка в реге')
                   throw error
               }
            },

              getUid(){
                const user = auth.currentUser
                return  user ? user.uid : null   
            },

            async logout ({commit}){
                 await signOut(auth)
                 commit('clearInfo')
            },
    }
}
