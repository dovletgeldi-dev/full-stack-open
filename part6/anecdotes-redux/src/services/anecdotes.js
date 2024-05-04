import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const obj = { id: getId(), content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const updateVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const objToChange = response.data;
  const newObject = { ...objToChange, votes: objToChange.votes + 1 };
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return (await request).data;
};

export default { getAll, createNew, updateVote };
