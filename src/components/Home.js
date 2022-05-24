import React, { useEffect, useState, useCallback } from 'react';
import ComicsList from './ComicsList';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);

	const fetchComicHandler = useCallback(async () => {
		setIsLoading(true);
		setErr(null);
		try {
			const response = await fetch(
				'https://ebookreader-5bd9b-default-rtdb.asia-southeast1.firebasedatabase.app/allBooks.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong!!');
			}

			const data = await response.json();

			const loadedMovies = [];

			for (const key in data) {
				loadedMovies.push({
					id: key,
					name: data[key].name,
					owner: data[key].owner,
					coverImage: data[key].coverImage,
					description: data[key].description,
					kindOfBook: data[key].kindOfBook,
					mountChapter: data[key].kindOfBook,
				});
			}
			setMovies(loadedMovies);
		} catch (err) {
			setErr(err.message);
		}
		setIsLoading(false);
	}, []);

	let content = <p>Found no comics</p>;

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
		fetchComicHandler();
	}, [fetchComicHandler]);
	return <div>{content}</div>;
};
export default Home;
