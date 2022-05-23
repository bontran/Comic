import React, { useRef } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';

function AddComic(props) {
	const titleRef = useRef('');
	const ownerRef = useRef('');
	const releaseDateRef = useRef('');
	const chapterRef = useRef('');
	const descriptionRef = useRef('');
	function submitHandler(event) {
		event.preventDefault();

		// could add validation here...

		const comic = {
			title: titleRef.current.value,
			owner: ownerRef.current.value,
			releaseDate: releaseDateRef.current.value,
			chapter: chapterRef.current.value,
			listChapterDetails: props.listFormData,
			description: descriptionRef.current.value
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
				<label htmlFor='owner'>Owner</label>
				<input type='text' id='owner' ref={ownerRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='date'>Release Date</label>
				<input type='text' id='date' ref={releaseDateRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='chapter'>Chapter</label>
				<input type='text' id='chapter' ref={chapterRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='description'>Description</label>
				<textarea rows="3" cols="3" type='text' id='description' className={classes.description} ref={descriptionRef} />
			</div>
			<DragAndDrog addFormHandler={props.addFormHandler}></DragAndDrog>
			<button className='w-100 text-center mt-3'>Add Comic</button>
		</form>
	);
}

export default AddComic;
