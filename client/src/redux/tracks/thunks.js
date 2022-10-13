import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import { getTracks, addTrack, deleteTrack, voteTrack} from './service';

export const getTracksAsync = createAsyncThunk(
    actionTypes.GET_TRACKS,
    async () => {
        return await getTracks();
    }
);

export const addTrackAsync = createAsyncThunk(
    actionTypes.ADD_TRACK,
    async (track) => {
        return await addTrack( track );
    }
);

export const deleteTrackAsync = createAsyncThunk(
    actionTypes.DELETE_Track,
    async ( trackId ) => {
        return await deleteTrack( trackId );
    }
)

export const voteTrackAsync = createAsyncThunk(
    actionTypes.VOTE_TRACK,
    async () => {
        return await voteTrack();
    }
)

