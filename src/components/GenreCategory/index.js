import {Component} from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../LoaderView'
import BackNavigation from '../BackNavigation'
import NavBar from '../NavBar'
import GenreCategoryItem from '../GenreCategoryItem'
import './index.css'

class GenreCategory extends Component {
  state = {genreListData: [], isLoading: true, screenSize: window.innerWidth}

  componentDidMount() {
    this.getGenrePlayList()
  }

  getAccessToken = () => {
    const token = Cookies.get('jwt_token')
    return token
  }

  getGenrePlayList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = this.getAccessToken()
    console.log(token)
    const genreListApiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const genreListOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(genreListApiUrl, genreListOptions)
    if (response.ok === true) {
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
      console.log(updatedData)

      this.setState({genreListData: updatedData, isLoading: false})
    }
  }

  renderPage = () => {
    const {genreListData} = this.state

    return (
      <>
        <h1 className="category-heading">Podcast</h1>
        <ul className="genre-list-container">
          {genreListData.map(item => (
            <GenreCategoryItem genreListItem={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, screenSize} = this.state

    return (
      <>
        <div className="genre-category-container">
          {screenSize >= 768 && <NavBar />}
          <BackNavigation />
          {isLoading ? <LoaderView /> : this.renderPage()}
        </div>
      </>
    )
  }
}

export default GenreCategory
