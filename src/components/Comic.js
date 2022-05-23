import React from 'react';
import cloud from '../assets/cloud-upload-regular-240.png';
import classes from './Comic.module.css';

const Comic = (props) => {
	return (
		<li className={classes.movie}>
			<h2>Title: {props.title}</h2>
			<p>
				<img style={{ width: '100px', height: '100px' }} src={props.coverImage}></img>
			</p>
		</li>
	);
};

export default Comic;
