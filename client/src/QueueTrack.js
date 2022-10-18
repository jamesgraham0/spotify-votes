import React from "react";

export default function QueueTrack({ track, voteTrack }) {
  const votes = track.votes;

  function addVote(e) {
    e.preventDefault();
    voteTrack(track);
  }

  return (
    <div
        style={{ cursor: "pointer" }}
        onClick={(e) => addVote(e)}
      >
        <div className="queue-list">
          <span className="queue-img-and-votes">
            <img className="queue-img" src={track.track.albumUrl} alt=":)"/>
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