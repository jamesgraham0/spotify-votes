import React from "react";
import QueueTrack from "./QueueTrack";

export default function Queue({ state, chooseTrack }) {
  

  return (
    <div className="queue-container">
      <h1 className="queue-header">Queue</h1>
      <div className="queue-track-container">
        <ul className=" list-group list-group-flush">
          {[...state]
          .map((track, index) => {
            if (index === 0) {
              chooseTrack(track.track)
            }
            return (
              <li key={track.id}>
                <QueueTrack 
                  track={track}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
