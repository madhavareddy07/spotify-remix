import './index.css'

const FailureView = ({onTryAgain}) => (
  <>
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djqkwknto/image/upload/v1711693074/alert-triangle_apfpgv.png"
        alt="failure view"
        className="not-found-img"
      />
      <p className="not-found-text">Something went wrong. Please try again</p>
      <button type="button" className="tryagainbutton" onClick={onTryAgain}>
        Try again
      </button>
    </div>
  </>
)

export default FailureView
