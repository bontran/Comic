import React, { useRef, useState } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import './Form.css';
import { storage } from "./fire";
import DropImage from './DropImage';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Form = (props) => {
	const titleChapterRef = useRef('');
	const numberChapterRef = useRef('');
	const [progress, setProgress] = useState(0);
	const formHandler = (e) => {
		e.preventDefault();
		const file = e.target[2].files[0];
		uploadFiles(file);
	};
	const stringHepler = (data) => {
		const index = data.lastIndexOf(".");
		return data.substring(index, data.length + 1);
	}
	const uploadFiles = (file) => {
		//
		if (!file) return;
		const sotrageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				console.log('hello')

				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const chapterDetail = {
						title: titleChapterRef,
						numberChapter: numberChapterRef
					}
					console.log("File available at", downloadURL);
					if (stringHepler(downloadURL) === 'jpg') {
						chapterDetail.urlImage = downloadURL
					}
					else {
						if (stringHepler(downloadURL) === 'mp3') {
							chapterDetail.urlAudio = downloadURL
						}
					}
					console.log("chapter detail=" + chapterDetail)
				});
			}
		);
	};



	function submitHandler(e) {
		e.preventDefault();
		formHandler(e);
		// could add validation here...
		console.log(e);
		const detailData = {
			id: props.index,
			titleChapter: titleChapterRef.current.value,
			numberChapter: numberChapterRef.current.value,
		};
		console.log(detailData);
		props.addFormHandler(false);
		props.onListData(detailData);
		//props.addComicHandler(comic);
	}
	return (
		<div style={{ marginTop: '100%', width: '400px' }}>
			<form className='border-ar' onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Title chapter</label>
					<input type='text' id='title' ref={titleChapterRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='owner'>Number chapter</label>
					<input type='text' id='owner' ref={numberChapterRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='title-comic'><b>Cover image</b></label>
					<input type="file" id='title-comic' className='input-l' on />
					<hr />
					<h4>Uploading done {progress}%</h4>
				</div>

				<div className={classes.control}>
					<label htmlFor='audio'><b>Audio</b></label>
					<input type="file" id='Audio' className='input-l' onChange={(e) => { console.log(e) }} />
					<hr />
					<h4>Uploading done {progress}%</h4>
				</div>
				<button className='w-100 text-center mt-3'>
					Add info about chapter
				</button>
			</form>
		</div>
	);
};

export default Form;