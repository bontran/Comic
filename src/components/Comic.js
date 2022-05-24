import React from 'react';
import cloud from '../assets/cloud-upload-regular-240.png';
import classes from './Comic.module.css';

const Comic = (props) => {
	return (
		<li className={classes.movie}>
			<p>
				<img
					style={{ width: '100%', height: '250px' }}
					src={props.coverImage}></img>
			</p>
			<h5>{props.name}</h5>
		</li>
	);
};

export default Comic;
