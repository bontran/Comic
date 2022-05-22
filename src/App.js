import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import { useState, useEffect } from 'react';
import Form from './components/Form';
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
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import Home from './components/Home';
import AddComic from './components/AddComic';
import NotFound from './components/NotFound';
import DropImage from './components/DropImage';
import { database, ref, set, push } from './components/fire';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPopup, setIsPopup] = useState(false);
	const [listFormData, setListFormData] = useState([]);
	const [index, setIndex] = useState(0);
	const history = useNavigate();
	const [sidebarWidth, setSidebarWidth] = useState(undefined);
	const [sidebarTop, setSidebarTop] = useState(undefined);
	const [content, setContent] = useState('');
	const db = database;
	useEffect(() => {
		const sidebarEl = document
			.querySelector('.sidebar')
			?.getBoundingClientRect();
		setSidebarWidth(sidebarEl?.width);
		setSidebarTop(sidebarEl?.top);
	}, []);

	useEffect(() => {
		if (!sidebarTop) return;

		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	}, [sidebarTop]);

	const isSticky = (e) => {
		const sidebarEl = document.querySelector('.sidebar');
		const scrollTop = window.scrollY;
		if (scrollTop >= sidebarTop - 10) {
			sidebarEl.classList.add('is-sticky');
		} else {
			sidebarEl.classList.remove('is-sticky');
		}
	};

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
				'https://react-http-6db68-default-rtdb.firebaseio.com/allBooks.json',
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
			listFormData.forEach(value => {
				const chapterOfBook = {
					chapterName: value.chapterName,
					idChapter: value.idChapter,
				}
				push(ref(db, 'ChapterOfBook/' + comic.idBook), chapterOfBook);
				console.log(value.contentAudio)
				const contentOfBook = {
					contentAudio: value.contentAudio,
					numberOfChapter: value.numberOfChapter,
					contentText: value.contentText
				}
				console.log(contentOfBook);
				set(ref(db, `ContentOfBook/${comic.idBook}/${value.idChapter}`), contentOfBook);
			})

		} catch (err) {
			console.log(err);
		}
	};

	const addFormHandler = (data, index) => {
		setIndex(index);
		console.log(index)
		setIsPopup(data);
	};

	const onListData = (data) => {
		setListFormData((prevList) => {
			return [...prevList, data];
		});
	};

	const onHandContent = (data) => {
		setContent(data);
	}
	console.log(listFormData);
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
										onHandContent={onHandContent}
										listFormData={listFormData}
										addFormHandler={addFormHandler}
										addComicHandler={addComicHandler}
									/>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
					<div className='col-7 sticky'>
						<div>
							<div className='row'>
								{isPopup && (
									<Form
										content={content}
										index={index}
										onListData={onListData}
										addFormHandler={addFormHandler}></Form>
								)}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</AuthProvider>
	);
};

export default App;
