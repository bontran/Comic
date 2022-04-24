import { initializeApp } from 'firebase/app';

import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logout = () => {
	signOut(auth);
};
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

export {
	auth,
	db,
	signInWithGoogle,
	signInWithEmailAndPassword,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
