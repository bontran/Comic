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
	const amountOfVisitRef = useRef(0);
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
		{ label: 'Hoàn thành', value: 'Hoàn thành' },
		{ label: 'Chưa hoàn thành', value: 'Chưa hoàn thành' },
	];

	const typeOfBook = [
		{ label: 'Kiếm Hiệp', value: 'Kiếm Hiệp' },
		{ label: 'Tình Cảm', value: 'Tình Cảm' },
		{ label: 'Hành Động', value: 'Hành Động' },
		{ label: 'Trinh Thám', value: 'Trinh thám' },
		{ label: 'Pháp Thuật', value: 'Pháp Thuật' },
		{ label: 'Cổ tích', value: 'Cổ tích' },
		{ label: 'Tiểu Thuyết', value: 'Tiểu Thuyết' },
		{ label: 'Truyện thơ', value: 'Truyện thơ' },
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
			mountChapter: +mountChapterRef.current.value,
			kindOfBook: kindOfBook,
			idBook: myuuid,
			amountOfVisit: 0,
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
						<label htmlFor='title'>Tên sách</label>
						<input type='text' id='title' ref={titleRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='author'>Tác giả</label>
						<input type='text' id='author' ref={ownerRef} />
					</div>
					<div>
						<Dropdown
							className={classes.control}
							label='Thể loại'
							options={typeOfBook}
							value={kindOfBook}
							onChange={onHandlerKindOfBook}></Dropdown>
					</div>
					<div className={classes.control}>
						<label htmlFor='coverImage'>
							<b>Ảnh bìa</b>
						</label>
						<input
							type='file'
							id='coverImage'
							className='input-l'
							ref={imageRef}
						/>
						<hr />
						<h6>Tải lên {progress}%</h6>
					</div>
					<div className={classes.control}>
						<label htmlFor='mountChapter'>Số chương</label>
						<input type='text' id='mountChapter' ref={mountChapterRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='description'>Mô tả</label>
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
							label='Trạng thái'
							options={statuses}
							value={valueStatus}
							onChange={onHandlerStatus}></Dropdown>
					</div>
					<button className='w-100 text-center mt-3'>Thêm Sách</button>
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
