import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourses } from "./redux/courseSlice";
import axios from "axios";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/20311516-95af-44de-97ff-c7c7522150c6")
      .then((response) => {
        dispatch(setCourses(response.data));
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
