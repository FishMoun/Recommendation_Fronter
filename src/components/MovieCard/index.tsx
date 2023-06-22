import React, { useState } from 'react';
import { Image, Modal, Rate } from '@arco-design/web-react';
import styles from './index.module.scss';

interface MovieProps {
	width: number;
	height: number;
}

const MovieBody: React.FC<MovieProps> = ({ width, height }) => {
	return (
		<>
			<Image
				preview={false}
				width={width}
				height={height}
				src="https://pic.616pic.com/bg_w1180/00/01/95/eDWwD17BPr.jpg"
			/>
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
						小王子
					</div>
					<div>2023-10-11</div>
				</div>
				<div className="right" style={{ fontSize: '20px' }}>
					9.1分
				</div>
			</div>
		</>
	);
};

const MovieFooter: React.FC = () => {
	return (
		<div className={styles.Desc} style={{ color: 'grey' }}>
			descbalabaladescbalabaladescbalabala descbalabala descbalabala
			descbalabala descbalabala
		</div>
	);
};

const MovieCard: React.FC = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			{visible && (
				<Modal
					title="小王子"
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
							<MovieBody width={150} height={200} />
						</div>

						<div style={{ flex: '1', padding: '0 10px' }}>
							<MovieFooter />
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
				<MovieBody width={210} height={280} />
				<MovieFooter />
			</div>
		</>
	);
};

export default MovieCard;
