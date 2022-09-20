import React, { useEffect } from "react";
import QueueTrack from "./QueueTrack";
import { useDoc } from "@syncstate/react";

export default function Queue() {
  const queuePath = "/queue";
  const [queueTracks, setQueueTracks] = useDoc(queuePath);

  function updateQueueOrder(trackUri, votes) {
    // setQueueTracks(current =>
    //   current.map(track => {
    //     if (track.track.uri === trackUri) {
    //       console.log(track.track)
    //       let updatedTrack = {
    //         id: track.track.id,
    //         track: track.track,
    //         votes: votes
    //       }
    //       return updatedTrack;
    //     }
    //     return track;
    //   }),
    // );
    console.log(queueTracks);
  }

  const queueList = queueTracks.map((queueTrack, index) => {
    return (
      <li key={queueTrack.index} className="queue-track">
        <QueueTrack 
          track={queueTrack} 
          trackQueuePath={queuePath + "/" + index} 
          updateQueueOrder={updateQueueOrder}
        />
      </li>
    );
  });

  return (
    <div className="queue-container">
      <h1 className="queue-header">Queue</h1>
      <div className="queue-track-container">
        <ul className=" list-group list-group-flush">{queueList}</ul>
      </div>
    </div>
  );
}
