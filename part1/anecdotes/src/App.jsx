/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
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
  const [voted, setVoted] = useState({
    0: 1,
    1: 3,
    2: 4,
    3: 2,
    4: 6,
    5: 3,
    6: 2,
    7: 5,
    8: 8,
  });

  console.log(voted);

  const handleNextClick = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length);

    while (randomAnecdote === selected) {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    }

    console.log(randomAnecdote);
    setSelected(randomAnecdote);
  };

  const handleVoteClick = () => {
    const copy = { ...voted };
    copy[selected] += 1;
    setVoted(copy);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {voted[selected]} votes</div>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
    </div>
  );
};

export default App;
