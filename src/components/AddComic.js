import React, { useRef } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import DropImage from '../components/DropImage';

function AddComic(props) {
	const titleRef = useRef('');
	const ownerRef = useRef('');
	const chapterRef = useRef('');
	const mountChapterRef = useRef(0);
	const kindOfBookRef = useRef('');
	const coverImageRef = useRef('');
	const amountOfVisitRef = useRef(0);
	const statusRef = useRef('');
	let myuuid = uuidv4();
	function submitHandler(event) {
		event.preventDefault();

		// could add validation here...

		const comic = {
			name: titleRef.current.value,
			listChapterDetails: props.listFormData,
			mountChapter: mountChapterRef.current.value,
			kindOfBook: kindOfBookRef.current.value,
			idBook: myuuid,
			coverImage: coverImageRef.current.value,
			amountOfVisit: amountOfVisitRef.current.value,
			author: ownerRef.current.value,
			status: statusRef.current.value
		};

		props.addComicHandler(comic);
		console.log(comic);
	}

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
				<label htmlFor='coverImage'>Cover image</label>
				<input type='text' id='coverImage' ref={coverImageRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='mountChapter'>Mount chapter</label>
				<input type='text' id='mountChapter' ref={mountChapterRef} />
			</div>
			
			<div className={classes.control}>
				<label htmlFor='status'>Status</label>
				<input type='text' id='Status' ref={statusRef} />
			</div>
			<DragAndDrog addFormHandler={props.addFormHandler}></DragAndDrog>
			
			<button className='w-100 text-center mt-3'>Add Comic</button>
		</form>
	);
}

export default AddComic;