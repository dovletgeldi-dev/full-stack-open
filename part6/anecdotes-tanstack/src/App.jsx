import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./context/NotificationContext";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const handleVote = (anecdote) => {
    console.log("vote", anecdote.id);

    dispatch({ type: "SHOW", action: `you voted '${anecdote.content}'` });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);

    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
