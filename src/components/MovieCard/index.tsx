import React, { useState } from 'react';
import { Image, Modal, Rate, Spin } from '@arco-design/web-react';
import styles from './index.module.scss';
import { MovieType } from '../../service/api';
import { genEllipsis } from '../../assets/genEllipsis';
import MovieItem from './MovieItem';

const MovieCard: React.FC<MovieType> = ({
	posterUrl,
	name,
	publishedYear,
	introduction,
	avgRate
}) => {
	const [visible, setVisible] = useState(false);

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
							<div>
								<div className="flexCenter" style={{ justifyContent: 'end' }}>
									<div style={{ padding: '3px 8px' }}>我的评分</div>
									<Rate
										defaultValue={5}
										onChange={(value) => {
											console.log(value);
											setVisible(false);
										}}
									/>
								</div>
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
