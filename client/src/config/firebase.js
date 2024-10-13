import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9CxLsWvyLmTjtUsACebj27omI_9TEYqs",
  authDomain: "swipenest-97460.firebaseapp.com",
  projectId: "swipenest-97460",
  storageBucket: "swipenest-97460.appspot.com",
  messagingSenderId: "919791885601",
  appId: "1:919791885601:web:6b6bd0afdedcdbaa33b260",
  measurementId: "G-Y09G3NDHX5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
