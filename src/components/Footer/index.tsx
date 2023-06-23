import React from 'react';
import styles from './index.module.scss';

const Footer: React.FC = () => {
	return (
		<div className={styles.Footer}>
			<ul className="flexClmCenter" style={{ lineHeight: '25px' }}>
				<li>©2023 - 2024 By HHU_软开课设_秦岭组</li>
				<li>团队成员：韩耀杰、李雅慧、葛天辰、李嘉轩</li>
				<li>欢迎体验我们的电影推荐系统！</li>
			</ul>
		</div>
	);
};

export default Footer;
