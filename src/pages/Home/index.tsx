import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import MovieCard from '../../components/MovieCard';
import {
	MovieType,
	getHotMoviesApi,
	getLikeMoviesApi
} from '../../service/api';
// import styles from './index.module.scss';

const Home: React.FC = () => {
	const [hotList, setHotList] = useState<MovieType[]>();
	const [likeList, setLikeList] = useState<MovieType[]>();
	useEffect(() => {
		getHotMoviesApi().then((res) => {
			setHotList(res.data);
		});
		getLikeMoviesApi().then((res) => {
			setLikeList(res);
		});
	}, []);
	console.log(hotList);
	return (
		<>
			<Title title="热门电影" />
			{hotList?.map((item) => (
				<MovieCard {...item} key={item.id} />
			))}
			<Title title="猜你喜欢" />
			{likeList?.map((item) => (
				<MovieCard {...item} key={item.id} />
			))}
		</>
	);
};

export default Home;
