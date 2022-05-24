import './DragAndDrop.module.css';
import DropFileInput from './DropFileInput';

const DragAndDrog = (props) => {
	const onFileChange = (files) => {
		//console.log(files);
	};
	const onContentChange = (content) => {
		console.log(content);
		props.onHandContent(content);
	};

	const onGetIndex = (index) => {
		props.getIndex(index);
	};

	return (
		<div className='box'>
			<h6 className='header'>Thêm chương</h6>
			<DropFileInput
				getIndex={onGetIndex}
				onContentChange={onContentChange}
				onFileChange={(files) => onFileChange(files)}
				onHandlerPopUp={props.onHandlerPopUp}
			/>
		</div>
	);
};

export default DragAndDrog;
