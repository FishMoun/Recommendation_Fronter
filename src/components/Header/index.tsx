import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	Avatar,
	Modal,
	// Alert,
	Form,
	Input,
	Radio,
	Select,
	Message
} from '@arco-design/web-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setPendingAction,
	fetchRatedMoviesDataAction
} from '../../store/features/ratedMoviesSlice';
import { loginAction } from '../../store/features/userSlice';
import {
	loginApi,
	LoginParams,
	RegisterParams,
	JOB_LIST,
	LIKE_LIST,
	UserSex,
	registerApi
} from '../../service/api';
import styles from './index.module.scss';

interface RegisterFormParams extends RegisterParams {
	password1: string;
}

const Header: React.FC = () => {
	const [loginVisible, setLoginVisible] = useState(false);
	const [registerVisible, setRegisterVisible] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm<LoginParams>();
	const [form1] = Form.useForm<RegisterFormParams>();
	const FormItem = Form.Item;
	const { isLogin, userInfo } = useAppSelector((store) => store.userInfo);
	const dispatch = useAppDispatch();
	const [modalLoading, setModalLoading] = useState<boolean>(false);

	return (
		<div>
			<div className={styles.Header}>
				<div className="left flexCenter">
					<img
						src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
						alt="#"
						width="154"
						height="20"
						style={{ marginRight: '30px', cursor: 'pointer' }}
						onClick={() => {
							navigate('/');
						}}
					/>
					<NavLink
						to="/home"
						className={({ isActive }) =>
							isActive ? 'navActive ' + styles.nav : styles.nav
						}
					>
						电影推荐
					</NavLink>
					<NavLink
						to="/recently"
						className={({ isActive }) =>
							isActive ? 'navActive ' + styles.nav : styles.nav
						}
					>
						最近
					</NavLink>
				</div>
				<div className="right flexCenter">
					<Avatar>
						<img
							alt="avatar"
							src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
						/>
					</Avatar>
					<NavLink
						to="/my"
						className={({ isActive }) =>
							isActive ? 'navActive ' + styles.User : styles.User
						}
					>
						{isLogin ? userInfo.userName : '游客'}
					</NavLink>

					{!isLogin && (
						<>
							<span
								className={styles.Login}
								style={{ marginLeft: '10px', fontSize: '12px' }}
								onClick={() => {
									setLoginVisible(true);
								}}
							>
								登陆
							</span>
							<span
								className={styles.Login}
								style={{ marginLeft: '10px', fontSize: '12px' }}
								onClick={() => {
									setRegisterVisible(true);
								}}
							>
								注册
							</span>
						</>
					)}
				</div>
			</div>
			{loginVisible && (
				<Modal
					title="欢迎登陆"
					confirmLoading={modalLoading}
					visible={true}
					onCancel={() => {
						setLoginVisible(false);
					}}
					onOk={() => {
						form.validate().then(
							() => {
								setModalLoading(true);
								loginApi(form.getFieldsValue() as LoginParams)
									.then(
										(res) => {
											if (!res || !res.data) {
												return;
											}
											Message.success('登陆成功！');
											form.clearFields();
											setLoginVisible(false);
											dispatch(
												loginAction(res.data as Partial<RegisterFormParams>)
											);
											dispatch(setPendingAction(true));
											dispatch(
												fetchRatedMoviesDataAction({ userId: res.data.userId })
											);
										},
										(err) => {
											Message.error(err.error);
										}
									)
									.finally(() => {
										setModalLoading(false);
									});
							},
							(err) => {
								Message.error(err);
							}
						);
					}}
				>
					<Form form={form}>
						<FormItem
							label="用户名"
							field={'userName'}
							rules={[{ required: true, message: '用户名必填' }]}
						>
							<Input placeholder="请输入您的账号" />
						</FormItem>
						<FormItem
							label="密码"
							field={'password'}
							rules={[{ required: true, message: '密码必填' }]}
						>
							<Input.Password placeholder="请输入您的密码" />
						</FormItem>
					</Form>
				</Modal>
			)}
			{registerVisible && (
				<Modal
					title="欢迎注册"
					confirmLoading={modalLoading}
					visible={true}
					onCancel={() => {
						setRegisterVisible(false);
					}}
					onOk={() => {
						form1.validate().then(
							() => {
								if (
									form1.getFieldValue('password') !==
									form1.getFieldValue('password1')
								) {
									Message.error('密码不一致！');
									return;
								}
								const params = form1.getFieldsValue();
								delete params.password1;
								params.age = Number(params.age);
								setModalLoading(true);
								registerApi(params as RegisterParams)
									.then(
										(res) => {
											Message.success('注册成功，请登陆！');
											form1.clearFields();
											setRegisterVisible(false);
											setLoginVisible(true);
											console.log(res);
										},
										(err) => {
											console.log(err);
										}
									)
									.finally(() => {
										setModalLoading(false);
									});
							},
							() => {
								Message.error('表单校验失败！');
							}
						);
					}}
				>
					<Form form={form1}>
						<FormItem
							label="用户名"
							field={'userName'}
							rules={[{ required: true, message: '用户名必填' }]}
						>
							<Input placeholder="请输入您的账号" />
						</FormItem>
						<FormItem
							label="密码"
							field={'password'}
							rules={[{ required: true, message: '密码必填' }]}
						>
							<Input.Password placeholder="请输入您的密码" />
						</FormItem>
						<FormItem
							label="确认密码"
							field={'password1'}
							rules={[{ required: true, message: '确认密码必填' }]}
						>
							<Input.Password placeholder="请再次确认密码" />
						</FormItem>
						<FormItem
							label="年龄"
							field={'age'}
							rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
						>
							<Input placeholder="请输入您的年龄" />
						</FormItem>
						<FormItem
							label="性别"
							field={'gender'}
							rules={[{ required: true, message: '性别必填' }]}
						>
							<Radio.Group
								options={[UserSex.Male, UserSex.Female, UserSex.Unkown]}
							></Radio.Group>
						</FormItem>
						<FormItem
							label="职业"
							field={'occupation'}
							rules={[{ required: true, message: '职业必填' }]}
						>
							<Select placeholder="请选择您的职业" mode="multiple">
								{JOB_LIST.map((jobItem: string) => (
									<Select.Option key={jobItem} value={jobItem}>
										{jobItem}
									</Select.Option>
								))}
							</Select>
						</FormItem>
						<FormItem
							label="兴趣类型"
							field={'likes'}
							rules={[{ required: true, message: '职业必填' }]}
						>
							<Select placeholder="请选择您的职业" mode="multiple">
								{LIKE_LIST.map((jobItem: string) => (
									<Select.Option key={jobItem} value={jobItem}>
										{jobItem}
									</Select.Option>
								))}
							</Select>
						</FormItem>
					</Form>
				</Modal>
			)}
		</div>
	);
};

export default Header;
