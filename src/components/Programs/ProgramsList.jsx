import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProgramsList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Static programs data for testing
    const fetchPrograms = () => {
      try {
        const staticPrograms = [
          { id: "1", name: "Math Program", description: "Advanced math classes for kids" },
          { id: "2", name: "Science Program", description: "Hands-on science experiments" },
          { id: "3", name: "Art Program", description: "Creative art workshops" },
        ];
        setPrograms(staticPrograms);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch programs.");
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Handle Delete
  const handleDelete = (programId) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      setPrograms(programs.filter((program) => program.id !== programId));
    }
  };

  // Handle Edit
  const handleEdit = (programId) => {
    navigate(`/program-form/${programId}`);
  };

  // Handle View Details
  const handleViewDetails = (programId) => {
    navigate(`/program-details/${programId}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
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
    <div className="container mt-4">
      <h2>Programs List</h2>

      {/* Add Program Button */}
      <div className="d-flex justify-content-between mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/program-form")}>
          Add Program
        </button>
      </div>

      {/* Programs Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Program ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.length > 0 ? (
            programs.map((program) => (
              <tr key={program.id}>
                <td>{program.id}</td>
                <td>{program.name}</td>
                <td>{program.description}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => handleViewDetails(program.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(program.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(program.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No programs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsList;
