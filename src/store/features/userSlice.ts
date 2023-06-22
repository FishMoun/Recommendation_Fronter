import { createSlice } from '@reduxjs/toolkit';
import { RegisterParams } from '../../service/api';

interface UserItem {
	userInfo: Partial<RegisterParams>;
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
		loginAction: (state, userInfo: { payload: Partial<RegisterParams> }) => {
			console.log(userInfo.payload);
			state.isLogin = true;
			state.userInfo = userInfo.payload;
		},
		logoutAction: (state) => {
			state = initialState;
			console.log(state);
		}
	}
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
