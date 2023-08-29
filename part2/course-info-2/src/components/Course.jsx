/* eslint-disable react/prop-types */
import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  console.log(course);

  return (
    <div>
      <Header key={course.id} name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
