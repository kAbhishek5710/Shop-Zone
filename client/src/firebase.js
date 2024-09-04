// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shop-zone-a4fee.firebaseapp.com",
  projectId: "shop-zone-a4fee",
  storageBucket: "shop-zone-a4fee.appspot.com",
  messagingSenderId: "894594998009",
  appId: "1:894594998009:web:f201be4075b1089289cc28",
  measurementId: "G-CZGG5LGWV5",
};

export const app = initializeApp(firebaseConfig);
