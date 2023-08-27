/* eslint-disable react/prop-types */
import { useState } from "react";

const Feedback = () => {
  return <h1>give feedback</h1>;
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const Statistics = () => {
  return <h1>statistics</h1>;
};

const Counter = (props) => {
  console.log(props);
  return (
    <div>
      <p>good: {props.clicks.good}</p>
      <p>neutral: {props.clicks.neutral}</p>
      <p>bad: {props.clicks.bad}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
    });
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
    });
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
    });
    setBad(bad + 1);
  };

  console.log(good);
  console.log(neutral);
  console.log(bad);
  return (
    <div>
      <Feedback />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <br />
      <Statistics />
      <Counter clicks={clicks} />
    </div>
  );
};

export default App;
