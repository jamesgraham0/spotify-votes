import React from "react";
import QueueTrack from "./QueueTrack";

export default function Queue() {
  const queueHTML = "hello";

  return (
    <div className="queue-container">
      <h1 className="queue-header">Queue</h1>
      <div className="queue-track-container">
        <ul className=" list-group list-group-flush">
          {queueHTML}
        </ul>
      </div>
    </div>
  );
}
