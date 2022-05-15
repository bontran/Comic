import React, { useRef, useState } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import './Form.css'

const Form = (props) => {
	const [list, setList] = useState([]);
	const titleChapterRef = useRef('');
	const numberChapter = useRef('');
	function submitHandler(event) {
		event.preventDefault();

		// could add validation here...
		const detailData = {
			id: props.index,
			titleChapter: titleChapterRef.current.value,
			numberChapter: numberChapter.current.value,
		};
		props.addFormHandler(false);
		const li = (prev => [...prev, detailData])
		console.log(li)
		props.onListData(li)
		//props.addComicHandler(comic);
	}
	return (
		<div style={{ marginTop: '100%' }}>
			<form  className='border-ar' onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Title chapter</label>
					<input type='text' id='title' ref={titleChapterRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='owner'>Number chapter</label>
					<input type='text' id='owner' ref={numberChapter} />
				</div>
				<button className='w-100 text-center mt-3'>
					Add info about chapter
				</button>
			</form>
		</div>
	);
};

export default Form;
