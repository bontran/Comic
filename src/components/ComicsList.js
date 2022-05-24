import React from 'react';
import Comic from './Comic';
import classes from './ComicsList.module.css';
import { database, ref, get, child } from './fire';
import { useNavigate } from 'react-router-dom';
const MovieList = (props) => {
	const dbRef = ref(database);
	const history = useNavigate();
	const edit = (id) => {
		get(child(dbRef, `allBooks/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					history('/add-comic', { state: snapshot.val() });
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<ul className={classes['movies-list']}>
			<div className='row'>
				{props.movies.map((movie, index) => (
					<div
						className='col-4'
						key={index}
						style={{ marginBottom: '20px' }}
						onClick={() => edit(movie.id)}>
						<Comic
							key={movie.id}
							name={movie.name}
							owner={movie.owner}
							coverImage={movie.coverImage}
							description={movie.description}
							kindOfBook={movie.kindOfBook}
							mountChapter={movie.kindOfBook}
						/>
					</div>
				))}
			</div>
		</ul>
	);
};

export default MovieList;
