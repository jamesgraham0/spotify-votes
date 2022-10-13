import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { addTrackAsync, getTracksAsync, deleteTrackAsync, voteTrackAsync } from './thunks';

const INITIAL_STATE = {
    tracks: [],
    getTracks: REQUEST_STATE.IDLE,
    addTrack: REQUEST_STATE.IDLE,
    deleteTrack: REQUEST_STATE.IDLE,
    voteTrack: REQUEST_STATE.IDLE,
    error: null
}

const tracksSlice = createSlice({
    name: 'tracks',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTracksAsync.pending, (state) => {
            state.getTracks = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(getTracksAsync.fulfilled, (state, action) => {
            state.getTracks = REQUEST_STATE.FULFILLED;
            console.log("get")
            state.list = action.payload;
        })
        .addCase(getTracksAsync.rejected, (state, action) => {
            state.getTracks = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(addTrackAsync.pending, (state) => {
            state.addTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(addTrackAsync.fulfilled, (state, action) => {
            state.addTrack = REQUEST_STATE.FULFILLED;
            console.log("add")
            state.list.push(action.payload);
        })
        .addCase(addTrackAsync.rejected, (state, action) => {
            state.addTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(deleteTrackAsync.pending, (state) => {
            state.deleteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(deleteTrackAsync.fulfilled, (state, action) => {
            state.deleteTrack = REQUEST_STATE.FULFILLED;
            console.log("delete")
            state.list = action.payload;
        })
        .addCase(deleteTrackAsync.rejected, (state, action) => {
            state.deleteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(voteTrackAsync.pending, (state) => {
            state.voteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(voteTrackAsync.fulfilled, (state, action) => {
            state.voteTrack = REQUEST_STATE.FULFILLED;
            console.log("vote")
            state.list = action.payload;
        })
        .addCase(voteTrackAsync.rejected, (state, action) => {
            state.voteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
    }
});

export default tracksSlice.reducer;