import React, { useState } from 'react';
import { Message, Modal, Rate } from '@arco-design/web-react';
import { MovieType, RateType } from '../../service/api';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import MovieItem from './MovieItem';
import { rateMovieApi } from '../../service/api';
import { fetchRatedMoviesDataAction } from '../../store/features/ratedMoviesSlice';

const MovieCard: React.FC<MovieType> = ({
	id,
	posterUrl,
	name,
	publishedYear,
	introduction,
	avgRate
}) => {
	const [visible, setVisible] = useState(false);
	const { isLogin, userInfo, ratedList } = useAppSelector((store) => {
		return { ...store.userInfo, ...store.ratedMovies };
	});
	const dispatch = useAppDispatch();
	let curRate = 0;

	for (const item of ratedList) {
		if (item.id === id) {
			curRate = item.curRate;
			break;
		}
	}

	const handleRate = (value: number) => {
		if (value !== curRate && userInfo.userId) {
			rateMovieApi({
				userId: userInfo.userId,
				movieId: id,
				rating: value as RateType
			})
				.then(() => {
					Message.info('评分成功！');
					userInfo.userId &&
						dispatch(fetchRatedMoviesDataAction({ userId: userInfo.userId }));
					setVisible(false);
				})
				.catch((err) => {
					Message.error('评分失败，请重试！err：' + err.error);
				});
		}
	};

	return (
		<>
			{visible && (
				<Modal
					title={name}
					visible={true}
					onCancel={() => {
						setVisible(false);
					}}
					style={{ width: 800, height: 'fit-content' }}
					footer={() => {
						return (
							<div className="flexCenter" style={{ justifyContent: 'end' }}>
								<div style={{ padding: '3px 8px' }}>我的评分</div>
								{isLogin ? (
									<Rate
										defaultValue={curRate}
										onChange={(value) => handleRate(value)}
									/>
								) : (
									<span style={{ color: 'red' }}>请登陆后进行评分</span>
								)}
							</div>
						);
					}}
				>
					<MovieItem
						name={name}
						posterUrl={posterUrl}
						avgRate={avgRate}
						publishedYear={publishedYear}
						introduction={introduction}
						introPosition="right"
					/>
				</Modal>
			)}
			<div
				onClick={() => {
					setVisible(true);
				}}
			>
				<MovieItem
					name={name}
					posterUrl={posterUrl}
					avgRate={avgRate}
					publishedYear={publishedYear}
					introduction={introduction}
				/>
			</div>
		</>
	);
};

export default MovieCard;
