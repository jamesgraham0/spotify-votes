export async function getTracks() {
    const response = await fetch('http://localhost:3000/tracks', {
        method: 'GET'
    });
    return response.json();
};

export async function addTrack(track) {
    const response = await fetch('http://localhost:3000/tracks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(track)
}); 
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }
    return data;
};

export async function deleteTrack(trackId) {
    const response = await fetch('http://localhost:3000/tracks/' + trackId.toString(), {
        method: 'DELETE'
    })
    .catch(error => {
        console.log(error);
    });
    return response.json();
}

// TODO: change this so that it actually adds a vote
export async function voteTrack(track) {
    let trackId = track.id;
    const response = await fetch('http://localhost:3000/tracks/vote/' + trackId.toString(), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(track)
    })
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }
    return data;
}