import './DragAndDrop.module.css';
import DropFileInput from './DropFileInput';

const DragAndDrog = (props) => {
	const onFileChange = (files) => {
		//console.log(files);
	};
	const onContentChange = (content) => {
		console.log(content);
		props.onHandContent(content)
	};

	return (
		<div className='box'>
			<h6 className='header'>Drop files input</h6>
			<DropFileInput
				addFormHandler={props.addFormHandler}
				onContentChange={onContentChange}
				onFileChange={(files) => onFileChange(files)}
				onHandlerPopUp={props.onHandlerPopUp}
			/>
		</div>
	);
};

export default DragAndDrog;