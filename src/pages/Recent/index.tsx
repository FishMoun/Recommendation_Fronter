import React from 'react';
import Title from '../../components/Title';
import MovieList from '../../components/MovieList';
import { useAppSelector } from '../../store/hooks';
// import styles from './index.module.scss';

const Recent: React.FC = () => {
	const { isLogin } = useAppSelector((store) => store.userInfo);
	const { ratedList, isPending } = useAppSelector((store) => store.ratedMovies);

	return (
		<>
			{isLogin ? (
				<MovieList title="最近浏览" movies={ratedList} isLoading={isPending} />
			) : (
				<Title title="请登陆" />
			)}
		</>
	);
};

export default Recent;
