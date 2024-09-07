import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { markAsCompleted, enrollInCourse } from "../redux/studentSlice";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(
    (state: RootState) => state.students.enrolledCourses
  );

  useEffect(() => {
    if (enrolledCourses.length === 0) {
      dispatch(
        enrollInCourse({
          id: 1,
          name: "React Development",
          instructor: "John Doe",
          thumbnail:
            "https://img.freepik.com/premium-vector/creative-web-development-design_961875-488603.jpg?ga=GA1.1.442875978.1722752158&semt=ais_hybrid",
          dueDate: "2024-09-30",
          completed: false,
          progress: 70,
        })
      );

      dispatch(
        enrollInCourse({
          id: 2,
          name: "Node.js Backend Development",
          instructor: "Jane Smith",
          thumbnail:
            "https://img.freepik.com/free-vector/coding-concept-illustration_114360-939.jpg?ga=GA1.1.442875978.1722752158&semt=ais_hybrid",
          dueDate: "2024-10-15",
          completed: false,
          progress: 30,
        })
      );
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-josefin">
      <h1 className="text-3xl font-rubik font-extrabold text-center mb-6">
        Student Dashboard
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {course.name}
              </h2>
              <p className="text-gray-700 mb-2">
                Instructor: {course.instructor}
              </p>
              <p className="text-gray-500 mb-4">
                Due date: {course.dueDate || "N/A"}
              </p>

              <div className="relative w-full h-6 bg-gray-200 rounded-full mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-in-out ${
                    course.completed ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${course.completed ? 100 : course.progress}%`,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                  {course.completed ? "100%" : `${course.progress}%`}
                </span>
              </div>

              <button
                onClick={() => dispatch(markAsCompleted(course.id))}
                className={`w-full py-2 mt-4 text-white rounded ${
                  course.completed ? "bg-green-500" : "bg-blue-500"
                } hover:opacity-90`}
                disabled={course.completed}
              >
                {course.completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))
        ) : (
          <p>No enrolled courses to display.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
