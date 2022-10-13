import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import Queue from "./Queue"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { addTrackAsync } from './redux/tracks/thunks'

const spotifyApi = new SpotifyWebApi({
  clientId: "1b96222290ef4dfb8b21fe86956b020d",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  const queue = useSelector(state => state.tracks.list);
  const dispatch = useDispatch();

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  //generate unique id
  const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
  const addTrack = (track) => {

      let id = keyGenerator();
      let trackToAdd = {
        id: id,
        track: track,
        votes: 1,
      }
      // dispatch(addTrackAsync(trackToAdd));
  }

  return (
    <div>
      <Container className="dashboard-search-browse-player">
        <Form.Control
          className="search-bar"
          type="search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="search-results-container">
          {searchResults.map(track => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                addTrack={addTrack}
              />
          ))}
          {searchResults.length === 0 && (
            <div className="text-center text-white text-base" style={{ whiteSpace: "pre" }}>
              {lyrics}
            </div>
          )}
        </div>
        <div className="player">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </Container>
      <div>
        <Queue/>
      </div>
    </div>
  )
}
