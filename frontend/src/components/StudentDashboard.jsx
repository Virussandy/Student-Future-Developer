import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [homeworkList, setHomeworkList] = useState([]);
  const studentName = localStorage.getItem("studentName");
  const studentClass = localStorage.getItem("studentClass");

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const token = localStorage.getItem("studentToken"); // or whatever you're storing it as

        const res = await axios.get(
          "http://35.171.163.171:5001/api/student/homework",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHomeworkList(res.data);
      } catch (err) {
        console.error("Failed to fetch homework:", err.message);
      }
    };

    fetchHomework();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentClass");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {studentName} 👋
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {/* notice */}
        <div>
          <h1 className="iteam-centre">NOTICE</h1>
          <p className="text-gray-600 mb-2">
            Here you can find all the homework assigned to your class. Click on
            the download button to get the homework file.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            Homework for Class {studentClass}
          </h3>

          {homeworkList.length === 0 ? (
            <p className="text-gray-600">No homework uploaded yet.</p>
          ) : (
            <ul className="space-y-4">
              {homeworkList.map((hw) => (
                <li
                  key={hw._id}
                  className="flex justify-between items-center border p-3 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-700">
                      📄 {hw.file.split("_").pop()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(hw.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                  <a
                    href={`https://admin-future-developer.onrender.com/uploads/${hw.file}`}
                    download
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
