import React, { useEffect } from "react";
import { useDoc } from "@syncstate/react";

export default function QueueTrack({ track, trackQueuePath }) {
  const [queue, setQueue] = useDoc("/queue", Infinity);
  const [trackToAdd, setTrackToAdd] = useDoc(trackQueuePath);

  return (
      <div className="queue-list">
        <img src={track.track.albumUrl} style={{ height: "100px", width: "100px" }} alt="here"/>
        <div className="m-3">
          <div>{track.track.title}</div>
          <div className="text-muted">{track.track.artist}</div>
        </div>
      </div>
  );
}