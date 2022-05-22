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
	const numberChapterRef = useRef('');
	const [progress, setProgress] = useState(0);
	const formHandler = (e) => {
		e.preventDefault();
		const fileImage = e.target[2].files[0];
		const fileAudio = e.target[3].files[0];
		uploadFiles(fileImage, fileAudio);
	};

	const stringHepler = (data) => {
		const index = data.lastIndexOf('.');
		return data.substring(index, data.length + 1);
	};

	const uploadFiles = async (fileImage, fileAudio) => {
		//
		if (!fileImage && !fileAudio) return;
		const sotrageRef = ref(storage, `files/${fileImage.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, fileImage);

		const storageRefAudio = ref(storage, `files/${fileAudio.name}`);
		const uploadAudioTask = uploadBytesResumable(storageRefAudio, fileAudio);
		const chapterDetailData = {
			id: props.index,
			title: titleChapterRef.current.value,
			numberChapter: numberChapterRef.current.value,
		};
		console.log(chapterDetailData);
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
						chapterDetailData.urlImage = downloadURL;
					}
					console.log(chapterDetailData);

					//props.addComicHandler(comic);
				});
			}
		);
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
						chapterDetailData.urlAudio = downloadURL;
					}
					console.log(chapterDetailData);
					props.addFormHandler(false);
					props.onListData(chapterDetailData);
					//props.addComicHandler(comic);
				});
			}
		);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(e);
		formHandler(e);
	};
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
					<label htmlFor='title-comic'>
						<b>Cover image</b>
					</label>
					<input type='file' id='title-comic' className='input-l' on />
					<hr />
					<h4>Uploading done {progress}%</h4>
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
