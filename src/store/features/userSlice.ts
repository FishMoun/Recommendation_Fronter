import { createSlice } from '@reduxjs/toolkit';
import { RegisterParams } from '../../service/api';

export type UserInfoType = Partial<RegisterParams & { userId: number }>;
interface UserItem {
	userInfo: UserInfoType;
	isLogin: boolean;
}

const initialState: UserItem = {
	userInfo: {},
	isLogin: false
};

export const userSlice = createSlice({
	name: 'couter',
	initialState,
	reducers: {
		loginAction: (state, userInfo: { payload: UserInfoType }) => {
			console.log(userInfo);
			state.isLogin = true;
			state.userInfo = userInfo.payload;
		}
	}
});

export const { loginAction } = userSlice.actions;

export default userSlice.reducer;
