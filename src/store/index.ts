import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import ratedMoviesSlice from './features/ratedMoviesSlice';

const store = configureStore({
	// 合并reducer
	reducer: {
		userInfo: userSlice,
		ratedMovies: ratedMoviesSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
