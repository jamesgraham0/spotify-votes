import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=1b96222290ef4dfb8b21fe86956b020d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container className="login" style={{ minHeight: "100vh" }}>
      <a className="login-button" href={AUTH_URL}>Spotify Votes</a>
    </Container>
  )
}
