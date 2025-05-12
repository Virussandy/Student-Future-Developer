import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classNumber: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://35.171.163.171:5001/api/student/signup",
        formData
      );
      if (res.data.success) {
        setSuccessMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        });
      } else {
        setErrorMessage(res.data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      console.error(err.response?.data || err.message);
      setErrorMessage(
        err.response?.data?.message || "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Student Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="classNumber"
          value={formData.classNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        >
          <option value="">Select Class</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>

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
          Sign Up
        </button>

        {successMessage && (
          <p className="text-sm text-center text-green-600">{successMessage}</p>
        )}

        {!successMessage && errorMessage && (
          <p className="text-sm text-center text-red-600">{errorMessage}</p>
        )}

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default StudentSignup;
