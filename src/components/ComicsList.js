import React from 'react';

import Comic from './Comic';
import classes from './ComicsList.module.css';

const MovieList = (props) => {
	return (
		<ul className={classes['movies-list']}>
			{props.movies.map((movie) => (
				<Comic
					key={movie.id}
					title={movie.title}
					owner={movie.owner}
					coverImage={movie.coverImage}
					description={movie.description}
					kindOfBook={movie.kindOfBook}
					mountChapter={movie.kindOfBook}
				/>
			))}
		</ul>
	);
};

export default MovieList;
