import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../LoaderView'
import EditorsPicks from '../EditorsPicks'
import GenresAndMoods from '../GenresAndMoods'
import NewReleases from '../NewReleases'
import NavBar from '../NavBar'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SpotifyClone extends Component {
  state = {
    editorsPickData: [],
    genresAndMoodsData: [],
    newReleasesData: [],
    apiStatusForEditorsPick: apiStatusConstants.initial,
    apiStatusForGenreAndMoods: apiStatusConstants.initial,
    apiStatusForNewReleases: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEditorsPickData()
    this.getGenreAndMoodsData()
    this.getNewReleasesData()
  }

  getAccessToken = () => {
    const token = Cookies.get('jwt_token')
    return token
  }

  getEditorsPickData = async () => {
    this.setState({
      apiStatusForEditorsPick: apiStatusConstants.inProgress,
    })
    const token = this.getAccessToken()

    const editorsPickApiUrl =
      'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const editorsPickOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(editorsPickApiUrl, editorsPickOptions)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.playlists.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        editorsPickData: updatedData,
        apiStatusForEditorsPick: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusForEditorsPick: apiStatusConstants.failure,
      })
    }
  }

  getGenreAndMoodsData = async () => {
    this.setState({
      apiStatusForGenreAndMoods: apiStatusConstants.inProgress,
    })
    const token = this.getAccessToken()

    const categoryApiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'
    const categoryOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(categoryApiUrl, categoryOptions)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.categories.items.map(item => ({
        href: item.href,
        icons: item.icons,
        id: item.id,
        name: item.name,
      }))

      this.setState({
        genresAndMoodsData: updatedData,
        apiStatusForGenreAndMoods: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusForGenreAndMoods: apiStatusConstants.failure,
      })
    }
  }

  getNewReleasesData = async () => {
    this.setState({
      apiStatusForNewReleases: apiStatusConstants.inProgress,
    })
    const token = this.getAccessToken()

    const newReleasesApiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const newReleasesOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(newReleasesApiUrl, newReleasesOptions)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.albums.items.map(item => ({
        albumType: item.album_type,
        artists: item.artists,
        availableMarkets: item.available_markets,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        releaseDate: item.release_date,
        releaseDatePrecision: item.release_date_precision,
        totalTracks: item.total_tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        newReleasesData: updatedData,
        apiStatusForNewReleases: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusForNewReleases: apiStatusConstants.failure,
      })
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPickData, apiStatusForEditorsPick} = this.state

    switch (apiStatusForEditorsPick) {
      case apiStatusConstants.success:
        return (
          <div className="content-container">
            <h1 className="content-heading">Editors Picks</h1>
            <div className="content">
              <ul className="products-list">
                {editorsPickData.map(item => (
                  <EditorsPicks editorsPickData={item} key={item.id} />
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return <FailureView onTryAgain={this.getEditorsPickData} />
      case apiStatusConstants.inProgress:
        return <LoaderView />
      default:
        return null
    }
  }

  renderGenresAndMoodList = () => {
    const {genresAndMoodsData, apiStatusForGenreAndMoods} = this.state

    switch (apiStatusForGenreAndMoods) {
      case apiStatusConstants.success:
        return (
          <div className="content-container">
            <h1 className="content-heading">Genres & Moods</h1>
            <div className="content">
              <ul className="products-list">
                {genresAndMoodsData.map(item => (
                  <GenresAndMoods genresAndMoodsData={item} key={item.id} />
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return <FailureView onTryAgain={this.getGenreAndMoodsData} />
      case apiStatusConstants.inProgress:
        return <LoaderView />
      default:
        return null
    }
  }

  renderNewReleasesList = () => {
    const {newReleasesData, apiStatusForNewReleases} = this.state
    switch (apiStatusForNewReleases) {
      case apiStatusConstants.success:
        return (
          <div className="content-container">
            <h1 className="content-heading">New Releases</h1>
            <div className="content">
              <ul className="products-list">
                {newReleasesData.map(item => (
                  <NewReleases newReleasesData={item} key={item.id} />
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return <FailureView onTryAgain={this.getNewReleasesData} />
      case apiStatusConstants.inProgress:
        return <LoaderView />
      default:
        return null
    }
  }

  renderHomeView = () => (
    <>
      {this.renderEditorsPicksList()}
      {this.renderGenresAndMoodList()}
      {this.renderNewReleasesList()}
    </>
  )

  render() {
    return (
      <>
        <div className="app-container">
          <NavBar />
          <div className="app-body">{this.renderHomeView()}</div>
        </div>
      </>
    )
  }
}

export default SpotifyClone
