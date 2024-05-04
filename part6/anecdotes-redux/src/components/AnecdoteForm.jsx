import { useDispatch } from "react-redux";
import { anecdoteAdded } from "../reducers/anecdoteReducer";
import {
  notifyAction,
  removeNotification,
} from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(anecdoteAdded(newAnecdote.content));
    dispatch(notifyAction(`you created '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
