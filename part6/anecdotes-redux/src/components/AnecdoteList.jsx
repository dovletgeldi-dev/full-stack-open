import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  notifyAction,
  removeNotification,
} from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (state.filters === null) {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filters.toLowerCase())
      );
    }
  });

  const dispatch = useDispatch();

  const vote = (id, content) => {
    console.log("vote", id);
    dispatch(addVote(id));
    dispatch(notifyAction(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
