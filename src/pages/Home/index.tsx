import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList';
import { Message } from '@arco-design/web-react';
import {
	MovieType,
	getHotMoviesApi,
	getLikeMoviesApi
} from '../../service/api';
import { useAppSelector } from '../../store/hooks';

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
			})
			.catch((err) => {
				Message.error('热门电影列表获取失败：' + err.error);
			})
			.finally(() => {
				setHotLoading(false);
			});
	}, []);

	useEffect(() => {
		setLikeLoading(true);
		userInfo.userId &&
			getLikeMoviesApi({ userId: userInfo.userId })
				.then((res) => {
					setLikeList(res.data);
				})
				.catch((err) => {
					Message.error('猜你喜欢列表获取失败：' + err.error);
				})
				.finally(() => {
					setLikeLoading(false);
				});
	}, [isLogin]);

	return (
		<>
			<MovieList title="热门电影" movies={hotList} isLoading={hotLoading} />

			{isLogin && (
				<MovieList title="猜你喜欢" movies={likeList} isLoading={likeLoading} />
			)}
		</>
	);
};

export default Home;
