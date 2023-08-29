/* eslint-disable react/prop-types */
import Part from "./Part";

const Content = (props) => {
  console.log(props.parts);
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
