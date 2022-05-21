import React, { useEffect, useState, useCallback } from 'react';
import ComicsList from './ComicsList';
import { Outlet } from 'react-router-dom';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setErr(null);
		try {
			const response = await fetch(
				'https://react-http-6db68-default-rtdb.firebaseio.com/movies.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong!!');
			}

			const data = await response.json();

			const loadedMovies = [];

			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					owner: data[key].owner,
					releaseDate: data[key].releaseDate,
					chapter: data[key].chapter,
				});
			}

			setMovies(loadedMovies);
		} catch (err) {
			setErr(err.message);
		}
		setIsLoading(false);
	}, []);

	let content = <p>Found no movies</p>;

	if (movies.length > 0) {
		content = <ComicsList movies={movies} />;
	}
	if (err) {
		content = <p>{err}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);
	return <div>{content}</div>;
};
export default Home;
