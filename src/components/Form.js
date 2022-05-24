import React, { useRef, useState } from 'react';
import DragAndDrog from './DragAnDrop';
import classes from './AddComic.module.css';
import { Button } from 'react-bootstrap';
import './Form.css';
import { storage } from './fire';
import DropImage from './DropImage';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const Form = (props) => {
	const titleChapterRef = useRef('');
	const [progress, setProgress] = useState(0);
	const formHandler = (e) => {
		e.preventDefault();
		console.log(e);
		// const fileImage = e.target[2].files[0];
		const fileAudio = e.target[1].files[0];
		uploadFiles(fileAudio);
	};

	const stringHepler = (data) => {
		const index = data.lastIndexOf('.');
		return data.substring(index, data.length + 1);
	};

	const uploadFiles = async (fileAudio) => {
		//
		if (!fileAudio) return;
		const storageRefAudio = ref(storage, `files/${fileAudio.name}`);
		const uploadAudioTask = uploadBytesResumable(storageRefAudio, fileAudio);
		const chapterOfBook = {
			idChapter: 'idChapter' + props.index,
			chapterName: titleChapterRef.current.value,
			numberOfChapter: props.index,
			contentText: props.content,
		};
		await uploadAudioTask.on(
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
				getDownloadURL(uploadAudioTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL);
					console.log(stringHepler(downloadURL));
					if (stringHepler(downloadURL).includes('mp3')) {
						chapterOfBook.contentAudio = downloadURL;
					}
					console.log(chapterOfBook);
					props.onHandlerPopUp(false);
					props.onListData(chapterOfBook);
					console.log('form content===' + chapterOfBook);
				});
			}
		);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		formHandler(e);
	};
	return (
		<div style={{ width: '100%' }}>
			<form className='border-ar' onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Title chapter</label>
					<input type='text' id='title' ref={titleChapterRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='audio'>
						<b>Audio</b>
					</label>
					<input
						type='file'
						id='Audio'
						className='input-l'
						onChange={(e) => {
							console.log(e);
						}}
					/>
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
