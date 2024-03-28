import './App.css';
import { useState} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc,getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const fs = require('fs');
const path = require('path'); 

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
    const [userName,setUserName]=useState('');
    const [pubMessages,setPubMessages]=useState([]);
    function handleMessageChange(e){
        setMessage(e.target.value);
    }
    function handleUserNameChange(e){
        setUserName(e.target.value);
    }
    async function updatePubs() {
        console.log("getting messages")
        let dataArray=[]
        const querySnapshot = await getDocs(collection(db, "pubmessage"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            dataArray.push(doc.data());
        });
        setPubMessages(dataArray);
    }
    async function sendPubMessage(){
        try {
            console.log("before send")
            const docRef = await addDoc(collection(db, 'pubmessage'), {
                message: `${message}`,
                userName: `${userName}`,
                createdAt: Date.now()
            });
            console.log("doc written",docRef.id);

            const logEntry = `${createdAt} - User ID: ${userName} - Message: ${message}\n`;
            
            this.logStream.write()
        }catch(e){
            console.error("error sending",e);
        }
    }
    function messageCardFactory(data){
return(<>
    <div>{data.userName}</div>
    <div>{data.message}</div>
    </>)
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
              <button onClick={updatePubs}>Update public messages</button>
              {pubMessages && pubMessages.map(msg=> messageCardFactory(msg))}
          </div>
      </div>
  );
}

export default App;
