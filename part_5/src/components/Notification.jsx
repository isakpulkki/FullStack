import '../index.css'
import PropTypes from 'prop-types'

const Notification = ({ message, error, setError, setMessage }) => {
  if (message) {
    setTimeout(() => {
      setMessage(null)
    }, 7500)
    return <div className="success">{message}</div>
  }
  if (error) {
    setTimeout(() => {
      setError(null)
    }, 7500)
    return <div className="error">{error}</div>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
  setError: PropTypes.func,
  setMessage: PropTypes.func,
}

export default Notification
