import { createApp } from 'vue'
import App from './App.vue'
import Paginate from "vuejs-paginate-next";
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.css'
import { getDatabase } from "firebase/database"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'
import tooltipDirective from './directives/tooltip.directive'
import {createHead} from "@vueuse/head"
const firebaseApp = initializeApp({ 
    apiKey: "AIzaSyC_v_4lK8mlAKF7-1D4vPvQdJ6uKmuRWHU",
    authDomain: "crm-system-86eef.firebaseapp.com",
    projectId: "crm-system-86eef",
    storageBucket: "crm-system-86eef.appspot.com",
    messagingSenderId: "1069999521434",
    appId: "1:1069999521434:web:f624b7663015950dfca923",
    measurementId: "G-VN7C9ME45B"
});

  let application

  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);

  auth.onAuthStateChanged(() => {
    if(!application){
      const head = createHead()
        application = createApp(App).use(store).use(router).use(messagePlugin).use(head).directive('tooltip', tooltipDirective).component('Loader', Loader).component('Paginate', Paginate).mount('#app');
    }
  });

export {auth, db, firebaseApp}




 

  