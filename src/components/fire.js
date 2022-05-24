import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';
import {
	getDatabase,
	ref,
	set,
	push,
	onValue,
	get,
	child,
} from 'firebase/database';

const firebaseConfig = {
	// apiKey: 'AIzaSyDl5iewNyIC8QY_XLuW8WcrL65hQltcqv8',
	// authDomain: 'react-http-6db68.firebaseapp.com',
	// databaseURL: 'https://react-http-6db68-default-rtdb.firebaseio.com',
	// projectId: 'react-http-6db68',
	// storageBucket: 'react-http-6db68.appspot.com',
	// messagingSenderId: '616250455154',
	// appId: '1:616250455154:web:312c95128bb8fa48d5beeb',
	// measurementId: 'G-KMEJ7RXZPV',
	apiKey: 'AIzaSyB6qL6F1ALYHrDB33q4ZMxu5eI8ispKBSw',
	authDomain: 'ebookreader-5bd9b.firebaseapp.com',
	databaseURL:
		'https://ebookreader-5bd9b-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'ebookreader-5bd9b',
	storageBucket: 'ebookreader-5bd9b.appspot.com',
	messagingSenderId: '847588198573',
	appId: '1:847588198573:web:4f76a294ed019b16319e24',
	measurementId: 'G-KL6VJ4581M',
};

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = app.auth();
export const database = getDatabase(app);
export { app, ref, set, push, onValue, get, child };
