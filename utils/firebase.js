import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyA3gxc8RSGVP5hr0XY1EmO69opB5G9tQCA",
	authDomain: "addressbook-a3085.firebaseapp.com",
	projectId: "addressbook-a3085",
	storageBucket: "addressbook-a3085.appspot.com",
	messagingSenderId: "218625014606",
	appId: "1:218625014606:web:3b05017f886629a865bc1f",
};
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	// firebase.analytics();
} else {
	firebase.app(); // if already initialized, use that one
}

export default firebase;
