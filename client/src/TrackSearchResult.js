import React from "react"

export default function TrackSearchResult({ track, addTrack, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  function handleAdd() {
    addTrack(track)
  }

  return (
    <div
      className="search-results"
      style={{ cursor: "pointer" }}
      onClick={handleAdd}
    >
      <img src={track.albumUrl} style={{ height: "100px", width: "100px" }} alt="here"/>
      <div className="m-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}
