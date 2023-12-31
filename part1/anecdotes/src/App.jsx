/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Anecdote = ({ text, selected, votes }) => {
  return (
    <div>
      <h1>{text}</h1>
      <div>{selected}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const MostVoted = ({ text, voted, anecdotes }) => {
  return (
    <div>
      <h1>{text}</h1>
      <div>{anecdotes}</div>
      <div>has {voted} votes</div>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const handleNextClick = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    while (randomAnecdote === selected) {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomAnecdote);
  };

  const handleVoteClick = () => {
    const copy = [...voted];
    copy[selected] += 1;
    setVoted(copy);
    if (voted[selected] >= voted[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <Anecdote
        selected={anecdotes[selected]}
        votes={voted[selected]}
        text="Anecdote of the day"
      />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <MostVoted
        anecdotes={anecdotes[mostVoted]}
        voted={voted[mostVoted]}
        text="Anecdote with the most votes"
      />
    </div>
  );
};

export default App;
