import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentSignup from "./components/StudentSignup";
import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<StudentLogin />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
