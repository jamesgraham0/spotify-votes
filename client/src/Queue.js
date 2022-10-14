import React from "react";
import QueueTrack from "./QueueTrack";

export default function Queue({ state }) {
  const queue = state;

  return (
    <div className="queue-container">
      <h1 className="queue-header">Queue</h1>
      <div className="queue-track-container">
        <ul className=" list-group list-group-flush">
          {[...queue]
          .map((track) => {
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
