import React from 'react';

import Movie from './Comic';
import classes from './ComicsList.module.css';

const MovieList = (props) => {
	return (
		<ul className={classes['movies-list']}>
			{props.movies.map((movie) => (
				<Movie
					key={movie.id}
					title={movie.title}
					releaseDate={movie.releaseDate}
					openingText={movie.openingText}
				/>
			))}
		</ul>
	);
};

export default MovieList;
