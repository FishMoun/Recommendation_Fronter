import React from 'react';
import Title from '../../components/Title';
import MovieCard from '../../components/MovieCard';
// import styles from './index.module.scss';

const Home: React.FC = () => {
	return (
		<>
			<Title title="热门电影" />
			<MovieCard />
			<Title title="猜你喜欢" />
		</>
	);
};

export default Home;
