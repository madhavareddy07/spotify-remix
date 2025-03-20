import {Link} from 'react-router-dom'
import BackNavigation from '../BackNavigation'

import './index.css'

const NotFound = () => (
  <>
    <BackNavigation />

    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djqkwknto/image/upload/v1711691648/Frame_153_awvf6h.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-text">PAGE NOT FOUND</h1>
      <Link to="/">
        <button type="button" className="login-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
