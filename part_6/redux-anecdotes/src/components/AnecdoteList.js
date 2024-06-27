import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'.`, 3));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <i>'{anecdote.content}' </i> has {anecdote.votes} votes. &nbsp;
          <button onClick={() => voteAnecdote(anecdote)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
