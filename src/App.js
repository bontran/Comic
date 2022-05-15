import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import Home from './components/Home';
import AddComic from './components/AddComic';
import NotFound from './components/NotFound';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPopup, setIsPopup] = useState(false);
	const [listFormData, setListFormData] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation === '1') setIsLoggedIn(true);
	}, []);

	const addComicHandler = async (comic) => {
		try {
			const response = await fetch(
				'https://react-http-6db68-default-rtdb.firebaseio.com/movies.json',
				{
					method: 'POST',
					body: JSON.stringify(comic),
					header: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	const addFormHandler = (data, index) => {
		setIndex(index);
		setIsPopup(data);
	};

	const onListData = (list) => {
		setListFormData(list);
	}
	return (
		<AuthProvider>
			<Nav setIsLoggedIn={setIsLoggedIn}></Nav>
			<Container>
				<div className='row'>
					<div className='col-5'>
					<Routes>
							<Route path='/dashboard' element={<Dashboard />}></Route>
							<Route path='/' element={<Home />}></Route>
							<Route path='/signup' element={<SignUp />} />
							<Route
								path='/login'
								element={!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
							/>
							<Route path='/forgot-password' element={<ForgotPassword />} />
							<Route
								path='/add-comic'
								element={
									<AddComic
										listFormData={listFormData}
										addFormHandler={addFormHandler}
										addComicHandler={addComicHandler}
									/>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
					<div className='col-3'>{isPopup && <Form index={index} onListData={onListData} addFormHandler={addFormHandler}></Form>}</div>
					<div className='col-4'>
					</div>
				</div>
			</Container>
		</AuthProvider>
	);
};

export default App;
