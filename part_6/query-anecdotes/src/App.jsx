import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>Anecdote service not available due to problems in server.</span>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h1>Anecdotes</h1>

      <Notification />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <br></br>
        </div>
      ))}

      <AnecdoteForm />
    </div>
  );
};

export default App;
