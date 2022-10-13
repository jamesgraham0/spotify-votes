const exampleTrack = [{
    id: "12345",
    track: {},
    votes: 7,
}]

const trackList = (state=exampleTrack, action) => {
    switch (action.type) {
        case 'GET_TRACKS':
            return state;
        case 'ADD_TRACK':
            console.log("ADDING TRACK to state");
            state.push(action.payload);
            return state;
        case 'DELETE_TRACK':
            state.splice(action.payload, 1)
            let id = 0;
            state.map((track) => {
                track.id = id;
                id++;
            });
            return state;
        case 'VOTE_TRACK':
            state.map((track) => {
                if (track.selected === true) {
                    track.selected = false;
                }
            });
            action.payload.selected = true;
            return state;
        default:
            return state;
    }
};

export default trackList;