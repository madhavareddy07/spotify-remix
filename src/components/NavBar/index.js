import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {IoClose} from 'react-icons/io5'
import './index.css'

class NavBar extends Component {
  state = {showMenu: false}

  onClickToggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickRedirectHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  RenderMenuButton = () => (
    <>
      <nav className="top-navbar-container">
        <ul className="product-item">
          <li>
            <button
              type="button"
              onClick={this.onClickRedirectHome}
              className="logo-button"
            >
              <img
                src="https://res.cloudinary.com/djqkwknto/image/upload/v1711548983/Group_1_xz4u3p.png"
                alt="website logo"
                className="music-spectrum-img"
              />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={this.onClickToggleMenu}
              className="menu-close-button"
            >
              <FiMenu className="menu-icon" />
            </button>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="side-navbar-container">
          <li className="product-item">
            <button
              type="button"
              onClick={this.onClickRedirectHome}
              className="logo-button"
            >
              <img
                src="https://res.cloudinary.com/djqkwknto/image/upload/v1711548983/Group_1_xz4u3p.png"
                alt="website logo"
                className="music-spectrum-img"
              />
            </button>
          </li>
          <li className="product-item">
            <div className="side-navbar-links">
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logo-button"
              >
                <img
                  src="https://res.cloudinary.com/djqkwknto/image/upload/v1711724992/log-out-04_dqfx3s.png"
                  alt="logout logo"
                  className="music-spectrum-img"
                />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )

  RenderMenuOptions = () => (
    <nav className="top-navbar-links">
      <button
        type="button"
        onClick={this.onClickLogout}
        className="logo-button"
      >
        <img
          src="https://res.cloudinary.com/djqkwknto/image/upload/v1711724992/log-out-04_dqfx3s.png"
          alt="logout logo"
          className="music-spectrum-img"
        />
      </button>
      <button
        type="button"
        onClick={this.onClickToggleMenu}
        className="menu-close-button"
      >
        <IoClose className="close-icon" />
      </button>
    </nav>
  )

  render() {
    const {showMenu} = this.state

    return (
      <header className="navbar-container">
        {showMenu ? this.RenderMenuOptions() : this.RenderMenuButton()}
      </header>
    )
  }
}

export default withRouter(NavBar)
