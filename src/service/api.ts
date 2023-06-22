import request from './request';

import { type } from 'os';

// 注册
export enum UserSex {
	Male = '男',
	Female = '女',
	Unkown = '保密'
}
export enum UserLikes {
	Comedy = '喜剧',
	ScienceFiction = '科幻'
}
export enum UserOccupation {
	Education = '教育',
	Artist = '艺术家',
	Administration = '行政',
	SchoolStudent = '中小学生',
	CollegeStudent = '大学生',
	CustomerService = '客户服务',
	Medical = '医疗',
	Management = '管理',
	Farmer = '农民',
	Housewife = '家庭主妇',
	Lawyer = '律师',
	Programmer = '程序员',
	Retirement = '退休',
	Marketing = '市场营销',
	Scientist = '科学家',
	SelfEmployed = '个体户',
	Engineer = '工程师',
	Craftsman = '工匠',
	Writer = '作家',
	Unemployed = '失业',
	Others = '其它'
}
export interface RegisterParams {
	age: number;
	gender: UserSex;
	likes: UserLikes[];
	occupation: UserOccupation[];
	password: string;
	// userId: string;
	userName: string;
}
export const JOB_LIST: UserOccupation[] = [
	UserOccupation.Education,
	UserOccupation.Artist,
	UserOccupation.Administration,
	UserOccupation.SchoolStudent,
	UserOccupation.CollegeStudent,
	UserOccupation.CustomerService,
	UserOccupation.Medical,
	UserOccupation.Management,
	UserOccupation.Farmer,
	UserOccupation.Housewife,
	UserOccupation.Lawyer,
	UserOccupation.Programmer,
	UserOccupation.Retirement,
	UserOccupation.Marketing,
	UserOccupation.Scientist,
	UserOccupation.SelfEmployed,
	UserOccupation.Engineer,
	UserOccupation.Craftsman,
	UserOccupation.Writer,
	UserOccupation.Unemployed,
	UserOccupation.Others
];
export const LIKE_LIST: UserLikes[] = [
	UserLikes.Comedy,
	UserLikes.ScienceFiction
];

// userMock
const users = [
	{
		userId: 0,
		age: 1,
		gender: UserSex.Female,
		likes: [UserLikes.Comedy],
		occupation: [UserOccupation.Education],
		password: 'Admin',
		userName: 'Admin'
	}
];

export const registerApi = (params: RegisterParams) => {
	console.log(params);
	// return new Promise((resolve) => {
	// 	users.push({
	// 		userId: users.length + 1,
	// 		...params
	// 	});
	// 	resolve('注册成功！');
	// });
	return request.post('/api/register', {
		...params,
		likes: params.likes.join(','),
		occupation: params.occupation.join(',')
	});
};

// 登陆
export type LoginParams = Pick<RegisterParams, 'userName' | 'password'>;
export const loginApi = (params: LoginParams) => {
	// console.log(params, users);
	// return new Promise((resolve, reject) => {
	// 	for (const item of users) {
	// 		if (
	// 			item.userName === params.userName &&
	// 			item.password === params.password
	// 		) {
	// 			resolve(item);
	// 		}
	// 	}
	// 	reject('账号或密码错误');
	// });
	return request.post('/api/login', params);
};

export type RateType = 1 | 2 | 3 | 4 | 5;
export interface MovieType {
	movieId: number;
	name: string;
	posterUrl: string;
	type: string;
	publishedYear: string;
	introduction: string;
	avgRate: RateType;
}

// movie mock
export const MOVIE_LIST: MovieType[] = [
	{
		movieId: 0,
		name: '小王子',
		posterUrl: 'https://pic.616pic.com/bg_w1180/00/01/95/eDWwD17BPr.jpg',
		type: UserLikes.ScienceFiction,
		publishedYear: '1998',
		introduction: 'xx',
		avgRate: 5
	}
];

// 热门电影
export const getHotMoviesApi = () => {
	return new Promise<MovieType[]>((resolve) => {
		resolve(MOVIE_LIST);
	});
};

// 猜你喜欢
export const getLikeMoviesApi = () => {
	return new Promise<MovieType[]>((resolve) => {
		resolve(MOVIE_LIST);
	});
};

// 最近浏览
export const getRecentMoviesApi = () => {
	return new Promise<MovieType[]>((resolve) => {
		resolve(MOVIE_LIST);
	});
};

// 评分
export interface RateParams {
	movieId: number;
	rating: RateType;
	userId: number;
}
export const rateMovieApi = (params: RateParams) => {
	console.log(params);
	return new Promise((resolve) => {
		resolve('评分成功');
	});
};

// 根据用户ID、电影ID获取用户评分
export const getMovieRate = (
	params: Pick<RateParams, 'movieId' | 'userId'>
) => {
	console.log(params);
	return new Promise((resolve) => {
		resolve(1);
	});
};
