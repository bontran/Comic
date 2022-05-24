import React, { useMemo, useRef, useState, useEffect } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './fire';
import Dropdown from './Dropdown';
import Form from './Form';
import { useLocation } from 'react-router-dom';

function AddComic(props) {
	const titleRef = useRef('');
	const ownerRef = useRef('');
	const mountChapterRef = useRef('');
	const amountOfVisitRef = useRef(12);
	const [progress, setProgress] = useState(0);
	const [valueStatus, setValueStatus] = useState('');
	const [kindOfBook, setKindOfBook] = useState('');
	const descriptionRef = useRef('');
	const imageRef = useRef('');
	const [isPopup, setIsPopup] = useState(false);
	const formRef = useRef();
	const [content, setContent] = useState('');
	let myuuid = uuidv4();
	const [index, setIndex] = useState(0);
	const location = useLocation();
	const statuses = [
		{ label: 'Unknown', value: 'null' },
		{ label: 'Done', value: 'done' },
		{ label: 'Undone', value: 'undone' },
	];

	const typeOfBook = [
		{ label: 'Choose type of book', value: 'null' },
		{ label: 'Horor', value: 'horor' },
		{ label: 'Comedy', value: 'comedy' },
		{ label: 'Action', value: 'action' },
	];

	useEffect(() => {
		if (location.state != null) {
			titleRef.current.value = location.state.name;
			ownerRef.current.value = location.state.author;
			mountChapterRef.current.value = location.state.mountChapter;
			setKindOfBook(location.state.kindOfBook);
			setValueStatus(location.state.status);
			descriptionRef.current.value = location.state.description + '';
			//amountOfVisitRef.current.value = +location.state.amountOfVisit;
		}
	}, []);

	const formHandler = (e) => {
		e.preventDefault();
		const fileImage = e.target[3].files[0];
		uploadFiles(fileImage);
	};

	const stringHepler = (data) => {
		const index = data.lastIndexOf('.');
		return data.substring(index, data.length + 1);
	};

	const uploadFiles = async (fileImage) => {
		if (!fileImage) return;
		const sotrageRef = ref(storage, `files/${fileImage.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, fileImage);
		const comic = {
			name: titleRef.current.value,
			mountChapter: mountChapterRef.current.value,
			kindOfBook: kindOfBook,
			idBook: myuuid,
			amountOfVisit: amountOfVisitRef.current.value,
			author: ownerRef.current.value,
			status: valueStatus,
			description: descriptionRef.current.value,
		};
		await uploadTask.on(
			'state_changed',
			(snapshot) => {
				console.log('hello');

				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					console.log(stringHepler(downloadURL));
					if (stringHepler(downloadURL).includes('jpg')) {
						comic.coverImage = downloadURL;
					}
					console.log(comic);
					props.addComicHandler(comic);
				});
			}
		);
	};

	function submitHandler(e) {
		e.preventDefault();
		formHandler(e);
		resetForm();
	}

	const resetForm = () => {
		formRef.current.reset();
		setKindOfBook('');
		setValueStatus('');
	};

	const onHandlerStatus = (event) => {
		setValueStatus(event.target.value);
	};

	const onHandlerKindOfBook = (event) => {
		setKindOfBook(event.target.value);
	};

	const onHandlerPopUp = (data) => {
		setIsPopup(data);
	};
	const onHandContent = (data) => {
		setContent(data);
		console.log('content==' + data);
	};

	const getIndex = (index) => {
		setIndex(index);
	};

	return (
		<div className='row'>
			<div className='col-4'>
				<form onSubmit={submitHandler} ref={formRef}>
					<div className={classes.control}>
						<label htmlFor='title'>Title</label>
						<input type='text' id='title' ref={titleRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='author'>Author</label>
						<input type='text' id='author' ref={ownerRef} />
					</div>
					<div>
						<Dropdown
							className={classes.control}
							label='Kind of book'
							options={typeOfBook}
							value={kindOfBook}
							onChange={onHandlerKindOfBook}></Dropdown>
					</div>
					<div className={classes.control}>
						<label htmlFor='coverImage'>
							<b>Cover image</b>
						</label>
						<input
							type='file'
							id='coverImage'
							className='input-l'
							ref={imageRef}
						/>
						<hr />
						<h4>Uploading done {progress}%</h4>
					</div>
					<div className={classes.control}>
						<label htmlFor='mountChapter'>Mount chapter</label>
						<input type='text' id='mountChapter' ref={mountChapterRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='description'>Description</label>
						<textarea
							rows='3'
							cols='3'
							type='text'
							id='description'
							className={classes.description}
							ref={descriptionRef}></textarea>
					</div>
					<div>
						<Dropdown
							className={classes.control}
							label='Status'
							options={statuses}
							value={valueStatus}
							onChange={onHandlerStatus}></Dropdown>
					</div>
					<button className='w-100 text-center mt-3'>Add Comic</button>
				</form>
			</div>
			<div className='col-4'>
				<DragAndDrog
					onHandlerPopUp={onHandlerPopUp}
					getIndex={getIndex}
					onHandContent={onHandContent}></DragAndDrog>
			</div>
			<div className='col-4'>
				{isPopup && (
					<Form
						onHandlerPopUp={onHandlerPopUp}
						content={content}
						index={index}
						onListData={props.onListData}></Form>
				)}
			</div>
		</div>
	);
}

export default AddComic;
