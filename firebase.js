
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWIJimqEsd79EXP1H9MFs-9EKnmQnVrYM",
  authDomain: "el-batl-farm.firebaseapp.com",
  projectId: "el-batl-farm",
  storageBucket: "el-batl-farm.firebasestorage.app",
  messagingSenderId: "726622404932",
  appId: "1:726622404932:web:4a7d7d438b139d1eccd711"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
