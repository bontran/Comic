import React from 'react';
import cloud from '../assets/cloud-upload-regular-240.png';
import classes from './Comic.module.css';

const Comic = (props) => {
	return (
		<li className={classes.movie}>
			<h2>Title: {props.title}</h2>
			<h3>Owner: {props.owner}</h3>
			<p>Release date: {props.releaseDate}</p>
			<p>Chapter: {props.chapter}</p>
			<p>
				<img src={cloud}></img>
			</p>
		</li>
	);
};

export default Comic;
