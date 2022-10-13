import React, { useEffect, useState } from "react";
import { useDoc } from "@syncstate/react";

export default function QueueTrack({ track, trackQueuePath }) {
  const [queue, setQueue] = useDoc("/queue", Infinity);
  const [trackToAdd, setTrackToAdd] = useDoc(trackQueuePath);
  const [votes, setVotes] = useState(1);

  const updateQueue = (id) => {
    let index = (trackQueuePath.slice(-1));
      // add the updatedTrack with new votes
    let updatedTrack = {...trackToAdd, votes:votes+1}
    setQueue((queue) => {
      queue.splice(index, 1, updatedTrack);
    })
  };

  function addVote(e) {
    e.preventDefault();
    setVotes((votes) => votes+1);
    updateQueue(trackToAdd.id);
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