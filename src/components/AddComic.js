import React, { useRef, useState } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import DropImage from '../components/DropImage';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './fire';

function AddComic(props) {
	const titleRef = useRef('');
	const ownerRef = useRef('');
	const chapterRef = useRef('');
	const mountChapterRef = useRef(0);
	const kindOfBookRef = useRef('');
	const coverImageRef = useRef('');
	const amountOfVisitRef = useRef(0);
	const statusRef = useRef('');
	const [progress, setProgress] = useState(0);
	const [content, setContent] = useState('');
	let myuuid = uuidv4();
	const formHandler = (e) => {
		e.preventDefault();
		// const fileImage = e.target[2].files[0];
		const fileImage = e.target[3].files[0];
		uploadFiles(fileImage);
	};

	const stringHepler = (data) => {
		const index = data.lastIndexOf('.');
		return data.substring(index, data.length + 1);
	};

	const uploadFiles = async (fileImage) => {
		//
		if (!fileImage) return;
		const sotrageRef = ref(storage, `files/${fileImage.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, fileImage);
		const comic = {
			name: titleRef.current.value,
			mountChapter: mountChapterRef.current.value,
			kindOfBook: kindOfBookRef.current.value,
			idBook: myuuid,
			amountOfVisit: amountOfVisitRef.current.value,
			author: ownerRef.current.value,
			status: statusRef.current.value,
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
		console.log(e)
		formHandler(e);
		// could add validation here...
	}

	const onHandlerContent = (data) => {
		setContent(data);
	}

	props.onHandContent(content);

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='title'>Title</label>
				<input type='text' id='title' ref={titleRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='author'>Author</label>
				<input type='text' id='author' ref={ownerRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='kindOfBook'>Kind of book</label>
				<input type='text' id='kindOfBook' ref={kindOfBookRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='coverImage'>
					<b>Cover image</b>
				</label>
				<input type='file' id='coverImage' className='input-l' on />
				<hr />
				<h4>Uploading done {progress}%</h4>
			</div>
			{/* <div className={classes.control}>
				<label htmlFor='coverImage'>Cover image</label>
				<input type='text' id='coverImage' ref={coverImageRef} />
			</div> */}
			<div className={classes.control}>
				<label htmlFor='mountChapter'>Mount chapter</label>
				<input type='text' id='mountChapter' ref={mountChapterRef} />
			</div>

			<div className={classes.control}>
				<label htmlFor='status'>Status</label>
				<input type='text' id='Status' ref={statusRef} />
			</div>
			<DragAndDrog addFormHandler={props.addFormHandler} onHandlerContent={onHandlerContent}></DragAndDrog>

			<button className='w-100 text-center mt-3'>Add Comic</button>
		</form>
	);
}

export default AddComic;
