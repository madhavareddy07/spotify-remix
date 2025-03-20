import {Route, Switch, Redirect} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import EditorPickPlaylist from './components/EditorPickPlaylist'
import NewReleasePlaylist from './components/NewReleasePlaylist'
import GenreCategory from './components/GenreCategory'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute
        exact
        path="/playlist/:id"
        component={EditorPickPlaylist}
      />
      <ProtectedRoute
        exact
        path="/category/:id/playlists"
        component={GenreCategory}
      />
      <ProtectedRoute exact path="/album/:id" component={NewReleasePlaylist} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
