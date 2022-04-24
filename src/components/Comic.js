import React from 'react';

import classes from './Comic.module.css';

const Comic = (props) => {
	return (
		<li className={classes.movie}>
			<h2>{props.title}</h2>
			<h3>{props.releaseDate}</h3>
			<p>{props.openingText}</p>
		</li>
	);
};

export default Comic;
