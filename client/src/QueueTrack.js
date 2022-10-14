import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { voteTrackAsync } from './redux/tracks/thunks';

export default function QueueTrack({ track }) {
  const [votes, setVotes] = useState(1);
  const dispatch = useDispatch();

  function addVote(e) {
    e.preventDefault();
    setVotes((votes) => votes+1);
    dispatch(voteTrackAsync(track));
  }

  return (
    <div
        style={{ cursor: "pointer" }}
        onClick={(e) => addVote(e)}
      >
        <div className="queue-list">
          <span className="queue-img-and-votes">
            <img src={track.track.albumUrl} style={{ height: "100px", width: "100px"}} alt=":)"/>
          </span>
          <div className="m-3">
            <div>{track.track.title}</div>
            <div className="text-muted">{track.track.artist}</div>
            <div className="votes">Votes: {votes}</div>
          </div>
        </div>
      </div>
  );
}