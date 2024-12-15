import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceTracker = ({ groupId }) => {
  const [children, setChildren] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://young-engineers-backk.onrender.com/api/attendance`
        );
        setChildren(response.data);
        // Initialize attendance state for each child
        const initialAttendance = response.data.reduce((acc, child) => {
          acc[child._id] = "absent"; // Default all to 'absent'
          return acc;
        }, {});
        setAttendance(initialAttendance);
        setLoading(false);
      } catch (err) {
        setError("Failed to load children data.");
        setLoading(false);
      }
    };

    fetchChildren();
  }, [groupId]);

  const handleAttendanceChange = (childId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [childId]: status,
    }));
  };

  const handleSubmitAttendance = async () => {
    try {
      await axios.post(
        `https://young-engineers-backk.onrender.com/api/attendance`,
        {
          groupId,
          attendance,
        }
      );
      setSuccessMessage("Attendance submitted successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to submit attendance.");
      setSuccessMessage(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ fontFamily: "'Signika', sans-serif" }}>
      <h1 className="mb-4 text-center">Attendance Tracker</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Child ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child._id}>
                <td>{child._id}</td>
                <td>{child?.childId?.name}</td>
                <td>
                  <div className="d-flex">
                    <label className="me-3">
                      <input
                        type="radio"
                        name={`attendance-${child._id}`} // Use unique name for each child
                        value="present"
                        checked={attendance[child._id] === "present"}
                        onChange={() => handleAttendanceChange(child._id, "present")}
                      />
                      Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${child._id}`} // Use unique name for each child
                        value="absent"
                        checked={attendance[child._id] === "absent"}
                        onChange={() => handleAttendanceChange(child._id, "absent")}
                      />
                      Absent
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSubmitAttendance}>
          Submit Attendance
        </button>
        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
