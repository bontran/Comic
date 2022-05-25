import React from 'react';
import Comic from './Comic';
import classes from './ComicsList.module.css';
import { database, ref, get, child } from './fire';
import { useNavigate } from 'react-router-dom';
const MovieList = (props) => {
	const dbRef = ref(database);
	const navigate = useNavigate();
	const editComic = (id) => {
		var bindData;
		get(child(dbRef, `allBooks/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const bookData = snapshot.val();
					console.log(bookData);
					bindData = { ...bookData };
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
		get(child(dbRef, `ChapterOfBook/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const chapter = snapshot.val();
					const data = { ...bindData, chapter };
					navigate('/add-comic', { state: data });
					console.log(data);
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
						onClick={() => editComic(movie.id)}>
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
