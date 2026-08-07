import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCtIJ0WxwR5tgYssbM59Y6f2H_hFrdaV4c',
  authDomain: 'cristian-nass.firebaseapp.com',
  databaseURL:
    'https://cristian-nass-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cristian-nass',
  storageBucket: 'cristian-nass.firebasestorage.app',
  messagingSenderId: '1056161668410',
  appId: '1:1056161668410:web:095fc8a7a684f2655b4403',
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export {database};
