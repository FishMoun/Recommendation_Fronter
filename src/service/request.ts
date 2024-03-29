import { Message } from '@arco-design/web-react';
import axios, {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse
} from 'axios';
import { BASE_URL } from '../assets/const';
// import qs from 'qs';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'content-type': 'application/json;charset=UTF-8'
	}
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			if (response.data.code !== 200) {
				Message.error(response.data.message);
				return Promise.reject(response.data);
			}
			return response.data;
		} else {
			return response.data;
		}
	},
	// 请求失败
	(error: any) => {
		const { response } = error;
		if (response) {
			// 请求已发出，但是不在2xx的范围
			return Promise.reject(response.data);
		} else {
			console.error('网络连接异常,请稍后再试!');
		}
	}
);

export default axiosInstance;
