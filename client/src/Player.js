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
        state.nextTracks = queue;
        if (!state.isPlaying) setPlay(false)
        // when state.position === 100, the song is done
        // console.log(state);
        // if (state.position === 100) {
        //   popQueue(state.track.id);
        // }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: '#1db954',
        bgColor: '#181818',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#FFF',
      }}
    />
  )
}
