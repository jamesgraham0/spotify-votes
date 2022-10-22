// This is the main reducer file where state is changed

import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../redux/utils';
import { 
    addTrackAsync, 
    getTracksAsync, 
    deleteTrackAsync, 
    voteTrackAsync,
    playTrackAsync 
} from '../redux/tracks/thunks';

const INITIAL_STATE = {
    tracks: [],
    playingTrack: null,
    playingTrackState: REQUEST_STATE.IDLE,
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

        // ============= GET =============
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


        // ============= ADD =============
        .addCase(addTrackAsync.pending, (state) => {
            console.log("add pending")
            state.addTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(addTrackAsync.fulfilled, (state, action) => {
            console.log("add fulfilled")
            state.addTrack = REQUEST_STATE.FULFILLED;
            let addToQueue = true;
            state.tracks.forEach((track, index) => {
                if (track.track.uri === action.payload.track.uri) {
                    console.log(`${action.payload.title} already in queue`)
                    addToQueue = false;
                }
            })
            if (addToQueue) state.tracks.push(action.payload);
        })
        .addCase(addTrackAsync.rejected, (state, action) => {
            console.log("add rejected")
            state.addTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })


        // ============= DELETE =============
        .addCase(deleteTrackAsync.pending, (state) => {
            console.log("delete pending")
            state.deleteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(deleteTrackAsync.fulfilled, (state, action) => {
            // action.payload is the track.id to be deleted
            // but for now it's being used to pop the queue
            console.log("delete fulfilled")
            state.deleteTrack = REQUEST_STATE.FULFILLED;
            state.tracks.shift();
        })
        .addCase(deleteTrackAsync.rejected, (state, action) => {
            console.log("delete rejected")
            state.deleteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })


        // ============= VOTE ============= 
        .addCase(voteTrackAsync.pending, (state) => {
            console.log("vote pending")
            state.voteTrack = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(voteTrackAsync.fulfilled, (state, action) => {
            console.log("vote fulfilled")
            state.voteTrack = REQUEST_STATE.FULFILLED;
            let id = action.payload.id;
            state.tracks.forEach((track, index) => {
                if (track.id === id && index !== 0) {
                    state.tracks[index].votes += 1;
                }
            })
            state.tracks.sort((a, b) => b.votes - a.votes);
            // state.playTrack = state.tracks[0];
            return state;
        })
        .addCase(voteTrackAsync.rejected, (state, action) => {
            console.log("vote rejected")
            state.voteTrack = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })

        // ============= PLAY TRACK ============= 
        .addCase(playTrackAsync.pending, (state) => {
            console.log("play pending")
            state.playingTrackState = REQUEST_STATE.PENDING;
            state.error = null;
        })
        .addCase(playTrackAsync.fulfilled, (state, action) => {
            console.log("play fulfilled")
            state.playingTrackState = REQUEST_STATE.FULFILLED;
            state.playingTrack = action.payload;
            return state;
        })
        .addCase(playTrackAsync.rejected, (state, action) => {
            console.log("play rejected")
            state.playingTrackState = REQUEST_STATE.REJECTED;
            state.error = action.error;
        })
    }
});

export default tracksSlice;