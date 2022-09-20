import React, { useEffect, useState } from "react";
import { useDoc } from "@syncstate/react";

export default function QueueTrack({ track, trackQueuePath, updateQueueOrder }) {
  const [queue, setQueue] = useDoc("/queue", Infinity);
  const [trackToAdd, setTrackToAdd] = useDoc(trackQueuePath);
  const [votes, setVotes] = useState(0);



  async function upVote(e) {
    e.preventDefault();
    await setVotes(votes+1);
    updateQueueOrder(track.track.uri, votes+1);
  }

  return (
    <div
        style={{ cursor: "pointer" }}
        onClick={upVote}
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