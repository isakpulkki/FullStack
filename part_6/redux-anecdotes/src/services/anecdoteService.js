import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
};

export default { getAll, createNew, voteAnecdote };
