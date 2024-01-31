// functions and sdk imports for firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

// web app firebase configuartion
const firebaseConfig = {
  apiKey: "AIzaSyCu0fNTFIv2C33GC2ZYMTib2N9KnZU8SYA",
  authDomain: "rl-agent-feedback.firebaseapp.com",
  projectId: "rl-agent-feedback",
  storageBucket: "rl-agent-feedback.appspot.com",
  messagingSenderId: "1019666713358",
  appId: "1:1019666713358:web:c244f8812ddb1784ae655f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

// add a new document to collection 'decisionTimes'
export async function writeDecisionTimesToDB(times = [4,4,4]) {

  await addDoc(collection(db, "decisionTimes"), {
    times: times
  });
  console.log("Stored decision times to database.")
}

// add a new document to collection 'userDecisions'
export async function writeDecisionsToDB(decisions = [4,4,4]) {

  await addDoc(collection(db, "userDecisions"), {
    correctlyChosen: decisions
  });
  console.log("Stored decisions to database.")
}

// add a new document to collection 'cognitiveCostRating'
export async function writeCognitiveCostToDB(cognitiveCost = -1) {

  await addDoc(collection(db, "cognitiveCostRating"), {
    cognitiveCost: cognitiveCost
  });
  console.log("Stored cognitive cost rating to database.")
}