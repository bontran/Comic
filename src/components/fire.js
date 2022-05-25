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
	update,
} from 'firebase/database';

const firebaseConfig = {
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
export { app, set, push, onValue, get, child, update, ref };
