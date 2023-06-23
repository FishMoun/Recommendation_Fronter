import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import MovieCard from '../../components/MovieCard';
import { Empty, Message, Spin } from '@arco-design/web-react';
import {
	MovieType,
	getHotMoviesApi,
	getLikeMoviesApi
} from '../../service/api';
import { useAppSelector } from '../../store/hooks';
import { UserInfoType } from '../../store/features/userSlice';
import styles from './index.module.scss';

const Home: React.FC = () => {
	const [hotList, setHotList] = useState<MovieType[]>([]);
	const [likeList, setLikeList] = useState<MovieType[]>([]);
	const [hotLoading, setHotLoading] = useState<boolean>(true);
	const [likeLoading, setLikeLoading] = useState<boolean>(true);
	const { isLogin, userInfo } = useAppSelector((store) => store.userInfo);

	useEffect(() => {
		setHotLoading(true);
		getHotMoviesApi()
			.then((res) => {
				setHotList(res.data);
				setHotLoading(false);
			})
			.catch((err) => {
				Message.error(err.error);
			});
	}, []);

	useEffect(() => {
		setLikeLoading(true);
		userInfo.userId &&
			getLikeMoviesApi({ userId: userInfo.userId })
				.then((res) => {
					setLikeList(res.data);
					setLikeLoading(false);
				})
				.catch((err) => {
					Message.error(err.error);
				});
	}, [isLogin]);

	return (
		<>
			<Title title="热门电影" />

			{hotList?.length < 1 ? (
				<Spin loading={hotLoading} block={true}>
					<Empty
						style={{
							padding: '80px',
							backgroundColor: 'rgba(144,144,144,0.1)'
						}}
					/>
				</Spin>
			) : (
				<div className={styles.imageContainer}>
					{hotList?.map((item) => (
						<div className={styles.imageItem}>
							<MovieCard {...item} key={item.id} />
						</div>
					))}
				</div>
			)}

			{isLogin && (
				<>
					<Title title="猜你喜欢" />
					{likeList?.length < 1 ? (
						<Spin loading={hotLoading} block={true}>
							<Empty
								style={{
									padding: '80px',
									backgroundColor: 'rgba(144,144,144,0.1)'
								}}
							/>
						</Spin>
					) : (
						<div className={styles.imageContainer}>
							{likeList?.map((item) => (
								<div className={styles.imageItem}>
									<MovieCard {...item} key={item.id} />
								</div>
							))}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Home;
