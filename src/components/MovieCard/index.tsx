import React, { useState } from 'react';
import { Image, Modal, Rate } from '@arco-design/web-react';
import styles from './index.module.scss';
import { MovieType } from '../../service/api';

interface MovieProps {
	movieInfo: Pick<
		MovieType,
		'posterUrl' | 'name' | 'publishedYear' | 'avgRate'
	>;
	width: number;
	height: number;
}

const MovieBody: React.FC<MovieProps> = ({ width, height, movieInfo }) => {
	const { posterUrl, name, publishedYear, avgRate } = movieInfo;
	return (
		<>
			<Image preview={false} width={width} height={height} src={posterUrl} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<div className="left">
					<div
						style={{
							fontSize: '16px',
							fontWeight: '600',
							lineHeight: '35px'
						}}
					>
						{name}
					</div>
					<div>{publishedYear}</div>
				</div>
				<div
					className="right"
					style={{
						fontSize: '20px',
						alignSelf: 'flex-start',
						lineHeight: '35px'
					}}
				>
					{avgRate.toFixed(1)}分
				</div>
			</div>
		</>
	);
};

const MovieFooter: React.FC<Pick<MovieType, 'introduction'>> = ({
	introduction
}) => {
	return (
		<div className={styles.Desc} style={{ color: 'grey' }}>
			{introduction}
		</div>
	);
};

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
					<div className={styles.MovieMore}>
						<div className={styles.MovieItem}>
							<MovieBody
								width={150}
								height={200}
								movieInfo={{ posterUrl, name, avgRate, publishedYear }}
							/>
						</div>

						<div style={{ flex: '1', padding: '0 10px' }}>
							<MovieFooter introduction={introduction} />
						</div>
					</div>
				</Modal>
			)}
			<div
				className={styles.MovieItem}
				onClick={() => {
					setVisible(true);
				}}
			>
				<MovieBody
					width={210}
					height={280}
					movieInfo={{ posterUrl, name, avgRate, publishedYear }}
				/>
				<MovieFooter introduction={introduction} />
			</div>
		</>
	);
};

export default MovieCard;
