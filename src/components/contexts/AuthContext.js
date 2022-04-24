import React, { useContext, useState, userEffect, useEffect } from 'react';
import { auth } from '../fire';
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	
	const signUp = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	}
	const logout = () => {
		return auth.signOut();
	}
	useEffect(() => {
		const unsubscriber = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscriber;
	}, []);

	const value = { currentUser, signUp, login, logout, resetPassword };
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
