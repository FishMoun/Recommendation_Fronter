import React from 'react';
import { Image, Spin } from '@arco-design/web-react';
import styles from './index.module.scss';
import { genEllipsis } from '../../assets/genEllipsis';
import { BASE_URL } from '../../assets/const';

export interface MovieItemProps {
	posterUrl: string;
	name: string;
	publishedYear: string;
	avgRate: number;
	introduction: string;
	introPosition?: 'bottom' | 'right';
}

const MovieItem: React.FC<MovieItemProps> = ({
	posterUrl,
	name,
	publishedYear,
	avgRate,
	introduction,
	introPosition = 'bottom'
}) => {
	return (
		<div className={introPosition === 'right' ? styles.LRBox : ''}>
			<div
				className={
					styles.MovieItem + ` ${introPosition === 'right' && styles.LBox}`
				}
			>
				<div className={styles.Image}>
					<Image
						preview={false}
						loader={
							<Spin
								dot
								size={5}
								style={{ width: '100%', height: '100%' }}
								className="flexCenter"
							></Spin>
						}
						width={'100%'}
						height={'100%'}
						src={BASE_URL + posterUrl}
					/>
				</div>
				<div className={styles.Content}>
					<div className={styles.ContentLeft}>
						<div style={{ padding: '5px 0', fontWeight: '600' }}>
							{genEllipsis(name, 1)}
						</div>
						<div>{publishedYear}</div>
					</div>
					<div className={styles.ContentRight}>{avgRate.toFixed(1)}分</div>
				</div>
				{introPosition === 'bottom' && (
					<div className={styles.Desc}>
						{genEllipsis(introduction || '暂无描述', 2, { color: 'gray' })}
					</div>
				)}
			</div>
			{introPosition === 'right' && (
				<div
					className={
						styles.Desc + ` ${introPosition === 'right' && styles.RBox}`
					}
				>
					{introduction +
						introduction +
						introduction +
						introduction +
						introduction +
						introduction || '暂无描述'}
				</div>
			)}
		</div>
	);
};

export default MovieItem;
