import React from "react";
import QueueTrack from "./QueueTrack";
import { useSelector } from 'react-redux';

export default function Queue({ chooseTrack, addVoteToTrack }) {
  const state = useSelector(state => state.tracks.trackList.tracks);

  const addVote = (track) => {
      addVoteToTrack(track);
  }

  return (
    <div className="queue-container">
      <h1 className="queue-header">Queue</h1>
      <div className="queue-track-container">
        <ul className=" list-group list-group-flush">
          {state && [...state]
          .map((track, index) => {
            if (index === 0) {
              // chooseTrack(track.track);
              return (
                <li key={track.id} id="playing-track">
                  <span className="queue-img-and-votes">
                    <img className="queue-img" src={track.track.albumUrl} alt=":)"/>
                  </span>
                  <div className="m-3">
                    <div>{track.track.title}</div>
                    <div className="text-muted">{track.track.artist}</div>
                  </div>
                </li>
              )
            }
            else {
              return (
                <li key={track.id}>
                  <QueueTrack 
                    track={track}
                    voteTrack={addVote}
                  />
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  );
}
