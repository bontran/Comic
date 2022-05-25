import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from '../config/ImageConfig';
import uploadImg from '../assets/cloud-upload-regular-240.png';
const DropFileInput = (props) => {
	const wrapperRef = useRef(null);
	const [fileList, setFileList] = useState([]);
	const [listChapters, setListChapters] = useState([]);

	const onDragEnter = () => wrapperRef.current.classList.add('dragover');

	const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

	const onDrop = () => wrapperRef.current.classList.remove('dragover');

	useEffect(() => {
		setFileList([]);
		setListChapters([]);
	}, [props.listNull]);

	const onFileDrop = async (e) => {
		e.preventDefault();
		const newFile = e.target.files[0];
		if (newFile) {
			await showFile(e);
			const updatedList = [...fileList, newFile];
			setFileList(updatedList);
			props.onFileChange(updatedList);
		}
	};

	const showFile = async (e) => {
		const reader = new FileReader();
		reader.onload = async (e) => {
			const text = e.target.result;
			const updatedList = [...listChapters, text];
			setListChapters(updatedList);
			props.onContentChange(text);
		};
		reader.readAsText(e.target.files[0]);
	};

	const fileRemove = (file) => {
		props.onHandlerPopUp(false);
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(file), 1);
		setFileList(updatedList);
		setListChapters(updatedList);
		props.onFileChange(updatedList);
		props.onHandlerPopUp(false);
	};

	const handlePopUpForm = (e) => {
		const index = +e.currentTarget.dataset.index + 1;

		props.onHandlerPopUp(false);
		setTimeout(() => {
			props.onHandlerPopUp(true);
			props.getIndex(index);
		}, 500);
	};
	//will log the index of the clicked item
	return (
		<>
			<div
				ref={wrapperRef}
				className='drop-file-input'
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}>
				<div className='drop-file-input__label'>
					<img src={uploadImg} alt='' />
					<p>Thêm file vào đây</p>
				</div>
				<input type='file' value='' onChange={onFileDrop} />
			</div>
			{fileList.length > 0 ? (
				<div className='drop-file-preview'>
					<p className='drop-file-preview__title'>Sẵn sàng thêm</p>
					{fileList.map((item, index) => (
						<div className='drop-file-preview__item' key={index}>
							<div
								data-index={index}
								className='drop-file-display'
								onClick={handlePopUpForm}>
								<img
									src={
										ImageConfig[item.type.split('/')[1]] ||
										ImageConfig['default']
									}
									alt=''
								/>
								<span className='drop-file-preview__item__info'>
									<p>{item.name}</p>
									<p>{item.size}B</p>
								</span>
							</div>
							<span
								className='drop-file-preview__item__del'
								onClick={() => fileRemove(item)}>
								x
							</span>
						</div>
					))}
				</div>
			) : null}
		</>
	);
};

DropFileInput.propTypes = {
	onFileChange: PropTypes.func,
};

export default DropFileInput;
