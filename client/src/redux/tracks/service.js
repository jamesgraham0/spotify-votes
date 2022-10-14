export async function getTracks() {
    return;
};

export async function addTrack(track) {
    return track;
};

export async function deleteTrack(trackId) {
    return trackId;
}

// Returns track with added vote
export async function voteTrack(track) {
    let currVotes = track.votes + 1;
    let trackToVote = {...track, votes:currVotes}
    console.log("track with added vote", trackToVote);
    return trackToVote;
}