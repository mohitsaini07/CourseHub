import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Course interface
export interface Course {
  id: number;
  name: string;
  instructor: string;
  thumbnail: string;
  dueDate: string;
  completed: boolean;
  progress: number;
}

// Define the state interface
export interface StudentState {
  enrolledCourses: Course[];
}

// Initial state with type
const initialState: StudentState = {
  enrolledCourses: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // PayloadAction<Course> to specify the shape of the course being enrolled
    enrollInCourse: (state, action: PayloadAction<Course>) => {
      state.enrolledCourses.push(action.payload);
    },
    // PayloadAction<number> since we're identifying a course by its ID (number)
    markAsCompleted: (state, action: PayloadAction<number>) => {
      const course = state.enrolledCourses.find((c) => c.id === action.payload);
      if (course) {
        course.completed = true;
      }
    },
  },
});

export const { enrollInCourse, markAsCompleted } = studentSlice.actions;
export default studentSlice.reducer;
