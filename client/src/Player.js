import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ queue, accessToken, trackUri, popQueue }) {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      autoPlay={true}
      token={accessToken}
      showSaveIcon={true}
      callback={state => {
        if (!state.isPlaying) setPlay(false)
        if (state.previousTracks.length && 
          state.previousTracks[state.previousTracks.length-1].uri === trackUri) {
          (async () => {
            await popQueue(state.track.id)
            .then(() => {
              state.nextTracks = queue;
            })
          })();
        }
        else {
          state.nextTracks = queue;
        }
        console.log("STATE", state);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: '#1db954',
        bgColor: '#181818',
        color: '#1db954',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#1db954',
      }}
    />
  )
}
