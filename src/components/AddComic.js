import React, { useMemo, useRef, useState } from "react";
import DragAndDrog from "./DragAnDrop";
import classes from "./AddComic.module.css";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./fire";
import Dropdown from "./Dropdown";
import Form from './Form'

function AddComic(props) {
	const titleRef = useRef("");
	const ownerRef = useRef("");
	const mountChapterRef = useRef('');
	const amountOfVisitRef = useRef(12);
	const [progress, setProgress] = useState(0);
	const [valueStatus, setValueStatus] = useState("");
	const [kindOfBook, setKindOfBook] = useState("");
	const descriptionRef = useRef('');
	const imageRef = useRef('');
	const [isPopup, setIsPopup] = useState(false);

	let myuuid = uuidv4();
	const statuses = [
		{ label: "Done", value: "done" },
		{ label: "Undone", value: "undone" },
	];

	const typeOfBook = [
		{ label: "Horor", value: "horor" },
		{ label: "Comedy", value: "comedy" },
		{ label: "Action", value: "action" },
	];

	const formHandler = (e) => {
		e.preventDefault();
		const fileImage = e.target[3].files[0];
		uploadFiles(fileImage);
	};

	const stringHepler = (data) => {
		const index = data.lastIndexOf(".");
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
			description: descriptionRef.current.value
		};
		await uploadTask.on(
			"state_changed",
			(snapshot) => {
				console.log("hello");

				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					console.log(stringHepler(downloadURL));
					if (stringHepler(downloadURL).includes("jpg")) {
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
		titleRef.current.value = '';
		mountChapterRef.current.value = '';
		setKindOfBook('');
		setValueStatus('');
		//amountOfVisitRef.current.value = '';
		ownerRef.current.value = '';
		descriptionRef.current.value = '';
		imageRef.current.value = '';
	}

	const onHandlerStatus = (event) => {
		setValueStatus(event.target.value);
	};

	const onHandlerKindOfBook = (event) => {
		setKindOfBook(event.target.value);
	};

	const onHandlerPopUp = (data) => {
		setIsPopup(data);
	}
	// const onHandlerContent = useMemo((data) => {
	// 	setContent(data);
	// }, [content]);

	// props.onHandContent(content);
	return (

		<form onSubmit={submitHandler}>
			<div className="row">
				<div className='col-4'>
					<div className={classes.control}>
						<label htmlFor="title">Title</label>
						<input type="text" id="title" ref={titleRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" ref={ownerRef} />
					</div>
					<div>
						<Dropdown
							className={classes.control}
							label="Kind of book"
							options={typeOfBook}
							value={kindOfBook}
							onChange={onHandlerKindOfBook}
						></Dropdown>
					</div>
					<div className={classes.control}>
						<label htmlFor="coverImage">
							<b>Cover image</b>
						</label>
						<input type="file" id="coverImage" className="input-l" ref={imageRef} />
						<hr />
						<h4>Uploading done {progress}%</h4>
					</div>
					<div className={classes.control}>
						<label htmlFor="mountChapter">Mount chapter</label>
						<input type="text" id="mountChapter" ref={mountChapterRef} />
					</div>
					<div>
						<Dropdown
							className={classes.control}
							label="Status"
							options={statuses}
							value={valueStatus}
							onChange={onHandlerStatus}
						></Dropdown>
					</div>
					<button className="w-100 text-center mt-3">Add Comic</button>
				</div>

				<div className='col-3'>
					<DragAndDrog
						onHandlerPopUp={onHandlerPopUp}
						addFormHandler={props.addFormHandler}
						onHandContent={props.onHandContent}
					></DragAndDrog>
				</div>
				<div className='col-5'>
					{isPopup && <Form
						content={props.content}
						index={props.index}
						onListData={props.onListData}
					></Form>}
				</div>
			</div>
		</form >


	);
}

export default AddComic;
