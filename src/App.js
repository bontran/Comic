import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Outlet,
	useNavigate,
	Route,
	Routes,
} from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import Home from './components/Home';
import AddComic from './components/AddComic';
import NotFound from './components/NotFound';
import { database, ref, set, push, onValue } from './components/fire';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [listFormData, setListFormData] = useState([]);
	const history = useNavigate();
	const db = database;

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation === '1') {
			history('/');
			setIsLoggedIn(true);
		}
	}, []);

	const addComicHandler = async (comic) => {
		try {
			const response = await fetch(
				'https://ebookreader-5bd9b-default-rtdb.asia-southeast1.firebasedatabase.app/allBooks.json',
				{
					method: 'POST',
					body: JSON.stringify(comic),
					header: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(listFormData);
			listFormData.forEach((value) => {
				const chapterOfBook = {
					chapterName: value.chapterName,
					idChapter: value.idChapter,
					numberOfChapter: value.numberOfChapter,
				};
				push(ref(db, 'ChapterOfBook/' + comic.idBook), chapterOfBook);
				console.log(value.contentAudio);
				const contentOfBook = {
					contentAudio: value.contentAudio,
					numberOfChapter: value.numberOfChapter,
					contentText: value.contentText,
				};
				console.log(contentOfBook);
				set(
					ref(db, `ContentOfBook/${comic.idBook}/${value.idChapter}`),
					contentOfBook
				);
			});
		} catch (err) {
			console.log(err);
		}
	};
	const onListData = (data) => {
		setListFormData((prevList) => {
			return [...prevList, data];
		});
	};

	return (
		<AuthProvider>
			<Nav setIsLoggedIn={setIsLoggedIn}></Nav>
			<Container>
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
								onListData={onListData}
								listFormData={listFormData}
								addComicHandler={addComicHandler}
							/>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</AuthProvider>
	);
};

export default App;
