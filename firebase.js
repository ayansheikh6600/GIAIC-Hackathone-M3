import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection,setDoc, addDoc,getDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to usf
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCOiWzuWp8aG-_ljrGZOTE_zhsTxhMrbvY",
    authDomain: "giaic-hackathone-resume.firebaseapp.com",
    projectId: "giaic-hackathone-resume",
    storageBucket: "giaic-hackathone-resume.appspot.com",
    messagingSenderId: "736030301602",
    appId: "1:736030301602:web:b8a24ee980e4a395f426fb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  console.log(app);
  


  const Upload = async(formData, email)=>{

            const res = await setDoc(doc(db, "resume", email,),formData)
            console.log(formData)
            

  }


  const GetData = async(username)=>{


    const docRef = doc(db, "resume", username);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  return docSnap.data()
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }







  export default Upload

  export{
    GetData
  }
