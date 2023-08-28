/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const Feedback = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Statistics = ({ text }) => {
  return <h1>{text}</h1>;
};

const Counter = ({ good, neutral, bad }) => {
  const calculateAll = good + neutral + bad;
  const calculateAverage = (good - bad) / (calculateAll || true);
  const calculatePositiveFeedback = (100 * good) / (calculateAll || true);

  if (calculateAll === 0) {
    return <p>No Feedback Given</p>;
  }

  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {calculateAll}</p>
      <p>average: {calculateAverage}</p>
      <p>positive: {calculatePositiveFeedback}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  console.log(good);
  console.log(neutral);
  console.log(bad);
  return (
    <div>
      <Feedback text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <br />
      <Statistics text="statistics" />
      <Counter good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
