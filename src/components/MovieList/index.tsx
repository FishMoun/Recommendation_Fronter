import React from 'react';
import { MovieType } from '../../service/api';
import Title from '../Title';
import MovieCard from '../MovieCard';
import { Spin, Empty } from '@arco-design/web-react';
import styles from './index.module.scss';

export interface MovieListProps {
	title: string;
	isLoading: boolean;
	movies: MovieType[];
}

const MovieList: React.FC<MovieListProps> = ({ title, isLoading, movies }) => {
	return (
		<>
			<Title title={title} />
			{movies?.length < 1 ? (
				<Spin loading={isLoading} block={true}>
					<Empty
						style={{
							padding: '80px',
							backgroundColor: 'rgba(144,144,144,0.1)'
						}}
					/>
				</Spin>
			) : (
				<div className={styles.imageContainer}>
					{movies?.map((item) => (
						<div className={styles.imageItem} key={item.id}>
							<MovieCard {...item} />
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default MovieList;
