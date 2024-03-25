import '../index.css';

const Notification = ({ message, error, setError, setMessage }) => {
  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 7500);
    return <div className="success">{message}</div>;
  }
  if (error) {
    setTimeout(() => {
      setError(null);
    }, 7500);
    return <div className="error">{error}</div>;
  }
};

export default Notification;
