export const getTracks = () => {
    return {
        type: 'GET_TRACKS'
    }
};

export const addTrack = track => {
    return {
        type: 'ADD_TRACK',
        payload: track
    }
};

export const deleteTrack = trackId => {
    return {
        type: 'DELETE_TRACK',
        payload: trackId
    }
};

export const voteTrack = trackId => {
    return {
        type: 'VOTE_TRACK',
        payload: trackId
    }
};