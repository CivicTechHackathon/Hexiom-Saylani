import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBKep5nfVTe4k5vcOLx_0OW9qNiuPuJFhc",
  authDomain: "hackathon2k18-f39bb.firebaseapp.com",
  databaseURL: "https://hackathon2k18-f39bb.firebaseio.com",
  projectId: "hackathon2k18-f39bb",
  storageBucket: "hackathon2k18-f39bb.appspot.com",
  messagingSenderId: "1062247765524"
};
firebase.initializeApp(config);


export default firebase