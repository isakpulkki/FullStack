import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(setNotification(`Created anecdote: '${content}'.`, 5));
  };

  return (
    <div>
      <h3>Create a new anecdote</h3>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
