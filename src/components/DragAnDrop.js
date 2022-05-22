import './DragAndDrop.module.css';
import DropFileInput from './DropFileInput';

const DragAndDrog = (props) => {
	const onFileChange = (files) => {
		console.log(files);
		// if (files.length > 0) {
		// 	props.addFormHandler(true);
		// } else {
		// 	props.addFormHandler(false);
		// }
	};
	const onContentChange = (content) => {
		console.log(content);
		props.onHandlerContent(content);
	};

	return (
		<div className='box'>
			<h2 className='header'>React drop files input</h2>
			<DropFileInput
				addFormHandler={props.addFormHandler}
				onContentChange={onContentChange}
				onFileChange={(files) => onFileChange(files)}
			/>
		</div>
	);
};

export default DragAndDrog;
