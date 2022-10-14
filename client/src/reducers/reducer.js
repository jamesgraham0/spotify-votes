// This is the main reducer file where state is changed

import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../redux/utils';
import { addTrackAsync, getTracksAsync, deleteTrackAsync, voteTrackAsync } from '../redux/tracks/thunks';

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
            console.log("get pending")
            state.error = null;
        })
        .addCase(getTracksAsync.fulfilled, (state, action) => {
            state.getTracks = REQUEST_STATE.FULFILLED;
            console.log("get")
            return state.tracks;
        })
        .addCase(getTracksAsync.rejected, (state, action) => {
            console.log("get rejected")
            state.getTracks = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(addTrackAsync.pending, (state) => {
            console.log("add pending")
            state.addTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(addTrackAsync.fulfilled, (state, action) => {
            console.log("add fulfilled")
            state.addTrack = REQUEST_STATE.FULFILLED;
            state.tracks.push(action.payload);
        })
        .addCase(addTrackAsync.rejected, (state, action) => {
            console.log("add rejected")
            state.addTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(deleteTrackAsync.pending, (state) => {
            console.log("delete pending")
            state.deleteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(deleteTrackAsync.fulfilled, (state, action) => {
            console.log("delete fulfilled")
            state.deleteTrack = REQUEST_STATE.FULFILLED;
            let id = action.payload.id;
            state.tracks.map((track, index) => {
                if (track.id === id) {
                    state.tracks.splice(index, 1)
                }
            })
            state.tracks.sort((a, b) => a.votes - b.votes);
            return state;
        })
        .addCase(deleteTrackAsync.rejected, (state, action) => {
            console.log("delete rejected")
            state.deleteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
        .addCase(voteTrackAsync.pending, (state) => {
            console.log("vote pending")
            state.voteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(voteTrackAsync.fulfilled, (state, action) => {
            console.log("vote fulfilled")
            state.voteTrack = REQUEST_STATE.FULFILLED;
            // first delete the old track from queue
            let id = action.payload.id;
            state.tracks.map((track, index) => {
                if (track.id === id) {
                    state.tracks.splice(index, 1)
                }
            })
            // push track with added vote
            state.tracks.push(action.payload)
            state.tracks.sort((a, b) => b.votes - a.votes);
            return state;
        })
        .addCase(voteTrackAsync.rejected, (state, action) => {
            console.log("vote rejected")
            state.voteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
    }
});

export default tracksSlice;