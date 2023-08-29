/* eslint-disable react/prop-types */
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  console.log(course);

  return (
    <div>
      <Header key={course.id} course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
