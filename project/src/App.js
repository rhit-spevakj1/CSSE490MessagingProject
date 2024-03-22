import './App.css';
import {useEffect, useState} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk53KyMpPmX6blCDISkg-yF4-qEXA82hw",
  authDomain: "tweeter-89ead.firebaseapp.com",
  projectId: "tweeter-89ead",
  storageBucket: "tweeter-89ead.appspot.com",
  messagingSenderId: "1007916827539",
  appId: "1:1007916827539:web:c9be969d190aa26c355e66",
  measurementId: "G-M33JKGLTK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function App() {
    const [message,setMessage]=useState('');
    const[userName,setUserName]=useState('');
    function handleMessageChange(e){
        setMessage(e.target.value);
    }
    function handleUserNameChange(e){
        setUserName(e.target.value);
    }
    useEffect(()=>{

    },[])
    async function sendPubMessage(){
        try {
            const docRef = await addDoc(collection(db, 'pubmessage'), {
                message: `${message}`,
                userName: `${userName}`
            });
            console.log("doc written",docRef.id);
        }catch(e){
            console.error("error sending",e);
        }
    }
  return (
      <div className="App">
        <button id="loginBar" className="navbar navbar-dark ">
          <a href={'/' } className="navbar-brand">Login</a>
        </button>

          <div className="container">
              <h1 id="MsgTitle">Tweeter</h1>
              <button id="directButton">Direct Chat</button>
              <button id="groupButton">Group Chat</button>
              <button id="publicButton">Public Chat</button>
              <select id="chatDropdown">
                  <option value="">Select Chat</option>
              </select>

              <div id="chatMessages"></div>
              <div>Username<input value={userName} onChange={handleUserNameChange}/></div>
              <div>message<input value={message} onChange={handleMessageChange}/></div>
              <button onClick={sendPubMessage}>Send Message</button>
          </div>
      </div>
  );
}

export default App;
