import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
console.log("hello world")
const app = initializeApp(firebaseConfig);
import {groupMessage} from "./dbElements";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//  Creatng public messages
function displayPublicMessages(){
// TODO grab the list of messages and create a html struct that can handle them all
}

document.getElementById('send').addEventListener('click', () => {
    const usrMsg = document.getElementById('usrMsg');
    const message = usrMsg.value.trim();
    if (message) {
        // TODO Add in firebase send api
        usrMsg.value = '';
    }
});