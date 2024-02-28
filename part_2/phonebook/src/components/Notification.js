import '../index.css';

const Notification = ({ message, error }) => {
    if (message) {
        return (
            <div className="success">
              {message}
            </div>
          )
    }
    if (error) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
}
  
  export default Notification;
  