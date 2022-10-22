import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { useSelector, useDispatch } from 'react-redux';
// import { playTrackAsync } from "./redux/tracks/thunks";

export default function Player({ accessToken, popQueue }) {
  const [play, setPlay] = useState(false)
  const [playingTrack, setPlayingTrack] = useState();
  const state = useSelector(state => state.tracks.trackList);
  const queue = useSelector(state => state.tracks.trackList.tracks);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (queue.length > 0) {
      setPlayingTrack(queue[0].track);
    }
  }, [queue])

  useEffect(() => {
    setPlay(true);
  }, [playingTrack])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      autoPlay={true}
      token={accessToken}
      showSaveIcon={true}
      callback={state => {
        if (!state.isPlaying) setPlay(false);
        if (state.previousTracks.length && 
          state.previousTracks[state.previousTracks.length-1].uri === playingTrack?.uri) {
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
      }}
      play={play}
      uris={playingTrack?.uri ? [playingTrack?.uri] : []}
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