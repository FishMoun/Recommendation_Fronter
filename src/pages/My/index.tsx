import React from 'react';
import Title from '../../components/Title';
import { Descriptions } from '@arco-design/web-react';
import { useAppSelector } from '../../store/hooks';
// import styles from './index.module.scss';

const enum UserInfoKey {
	userName = '用户名',
	gender = '性别',
	age = '年龄',
	occupation = '职业',
	likes = '兴趣类型'
}

const My: React.FC = () => {
	const { userInfo, isLogin } = useAppSelector((store) => {
		return store.userInfo;
	});
	const data = [
		{
			label: UserInfoKey.userName,
			value: userInfo.userName
		},
		{
			label: UserInfoKey.gender,
			value: userInfo.gender
		},
		{
			label: UserInfoKey.age,
			value: userInfo.age
		},
		{
			label: UserInfoKey.occupation,
			value: userInfo.occupation
		},
		{
			label: UserInfoKey.likes,
			value: userInfo.likes
		}
	];
	return (
		<>
			{isLogin ? (
				<>
					<Title title="个人中心" />
					<Descriptions
						column={1}
						colon=" :"
						layout="inline-horizontal"
						data={data}
					/>
				</>
			) : (
				<Title title="请登陆" />
			)}
		</>
	);
};

export default My;
