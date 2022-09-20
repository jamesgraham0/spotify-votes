import React from "react";
import QueueTrack from "./QueueTrack";
import { useDoc } from "@syncstate/react";

function App() {
  const queuePath = "/queue";
  const [queueTracks, setQueueTracks] = useDoc(queuePath);

  const queueList = queueTracks.map((queueTrack, index) => {
    return (
      <li key={queueTrack.index} className="queue-track">
        <QueueTrack track={queueTrack} trackQueuePath={queuePath + "/" + index} />
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

export default App;
