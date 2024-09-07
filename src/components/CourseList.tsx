import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
interface Course {
  id: number;
  name: string;
  instructor: string;
  thumbnail: string;
}

const CourseList: React.FC = () => {
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [search, setSearch] = useState<string>("");

  const filteredCourses = courses.filter(
    (course: Course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-josefin">
      <h1 className="text-6xl font-bold text-center text-gray-800 uppercase mb-6 font-rubik">
        Courses
      </h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search by course or instructor..."
          className="border p-3 w-full md:w-3/4 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/dashboard"
          className="ml-4 bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-500"
        >
          Go to Dashboard
        </Link>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: Course) => (
            <Link to={`/course/${course.id}`} key={course.id}>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  {course.name}
                </h2>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-700 text-xl font-semibold">
            No courses found
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
