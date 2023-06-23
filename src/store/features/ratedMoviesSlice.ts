import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieType, getRecentMoviesApi } from '../../service/api';

export interface ratedTypes {
	ratedList: (MovieType & { curRate: number })[];
	isPending: boolean;
}

const initialState: ratedTypes = {
	ratedList: [],
	isPending: false
};

export const fetchRatedMoviesDataAction = createAsyncThunk(
	'fetch/ratedMoviesData',
	async (params: { userId: number }) => {
		return await getRecentMoviesApi(params);
	}
);

export const ratedMoviesSlice = createSlice({
	name: 'ratedMovies',
	initialState,
	reducers: {
		setRatedListAction: (
			state,
			ratedList: { payload: (MovieType & { curRate: number })[] }
		) => {
			state.ratedList = ratedList.payload;
			state.isPending = false;
		},
		setPendingAction: (state, isPending: { payload: boolean }) => {
			state.isPending = isPending.payload;
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchRatedMoviesDataAction.fulfilled, (state, action) => {
			state.ratedList = action.payload.data;
			state.isPending = false;
		});
	}
});

export const { setRatedListAction, setPendingAction } =
	ratedMoviesSlice.actions;

export default ratedMoviesSlice.reducer;
