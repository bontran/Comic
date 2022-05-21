import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: 'AIzaSyDl5iewNyIC8QY_XLuW8WcrL65hQltcqv8',
	authDomain: 'react-http-6db68.firebaseapp.com',
	databaseURL: 'https://react-http-6db68-default-rtdb.firebaseio.com',
	projectId: 'react-http-6db68',
	storageBucket: 'react-http-6db68.appspot.com',
	messagingSenderId: '616250455154',
	appId: '1:616250455154:web:312c95128bb8fa48d5beeb',
	measurementId: 'G-KMEJ7RXZPV',
};

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = app.auth();
export default app;
