import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CourseDetails = () => {
  const { id } = useParams();
  const course = useSelector((state: RootState) =>
    state.courses.courses.find((course) => course.id === parseInt(id))
  );

  if (!course)
    return <p className="text-center text-red-500">Course not found!</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <img
        src={course.thumbnail}
        alt={course.name}
        className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
        {course.name}
      </h1>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Instructor:</strong>{" "}
        {course.instructor}
      </p>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Description:</strong>{" "}
        {course.description}
      </p>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Status:</strong>{" "}
        {course.enrollmentStatus}
      </p>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Duration:</strong> {course.duration}
      </p>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Schedule:</strong> {course.schedule}
      </p>
      <p className="text-lg mb-4">
        <strong className="text-gray-700">Location:</strong> {course.location}
      </p>
      <p className="text-lg mb-6">
        <strong className="text-gray-700">Prerequisites:</strong>{" "}
        {course.prerequisites.join(", ")}
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Syllabus</h2>
      {course.syllabus.map((week) => (
        <details
          key={week.week}
          className="border p-4 my-2 rounded-lg bg-white shadow-sm"
        >
          <summary className="cursor-pointer text-lg font-semibold text-blue-600">
            Week {week.week}: {week.topic}
          </summary>
          <p className="mt-2 text-gray-700">{week.content}</p>
        </details>
      ))}
    </div>
  );
};

export default CourseDetails;
