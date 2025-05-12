import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://student-future-developer.onrender.com/api/student/login",
        formData
      );
      if (res.data.success) {
        localStorage.setItem("studentToken", res.data.token);
        localStorage.setItem("studentName", res.data.student.name);
        localStorage.setItem("studentEmail", res.data.student.email);
        localStorage.setItem("studentClass", res.data.student.classNumber);
        navigate("/dashboard");
      } else {
        setErrorMessage(res.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage(
        err.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Student Login</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl"
        >
          Login
        </button>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        )}

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default StudentLogin;
