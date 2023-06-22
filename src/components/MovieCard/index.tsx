import React, { useState } from 'react';
import { Image, Modal, Rate } from '@arco-design/web-react';
import styles from './index.module.scss';

const MovieCard: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const genModal = () => {
		return (
			<Modal
				title="小王子"
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
				footer={() => {
					return (
						<div>
							<div className="flexCenter" style={{ justifyContent: 'end' }}>
								<div style={{ padding: '3px 8px' }}>我的评分</div>
								<Rate
									allowHalf
									defaultValue={4.5}
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
						<Image
							preview={false}
							width={150}
							height={200}
							src="https://pic.616pic.com/bg_w1180/00/01/95/eDWwD17BPr.jpg"
						/>
						<div
							style={{
								fontSize: '14px',
								fontWeight: '600',
								lineHeight: '30px'
							}}
						>
							小王子
						</div>
						<div>2023-10-11</div>
					</div>
					<div style={{ flex: '1', padding: '0 10px' }}>
						<div className={styles.Desc} style={{ color: 'grey' }}>
							descbalabaladescbalabaladescbalabala descbalabala descbalabala
							descbalabala descbalabala
						</div>
					</div>
				</div>
			</Modal>
		);
	};
	return (
		<>
			{genModal()}
			<div
				className={styles.MovieItem}
				onClick={() => {
					setVisible(true);
				}}
			>
				<Image
					preview={false}
					width={210}
					height={280}
					src="https://pic.616pic.com/bg_w1180/00/01/95/eDWwD17BPr.jpg"
				/>
				<div
					style={{ fontSize: '16px', fontWeight: '600', lineHeight: '35px' }}
				>
					小王子
				</div>
				<div>2023-10-11</div>
				<div className={styles.Desc} style={{ color: 'grey' }}>
					descbalabaladescbalabaladescbalabala descbalabala descbalabala
					descbalabala descbalabala
				</div>
			</div>
		</>
	);
};

export default MovieCard;
