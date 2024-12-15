import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProgramsList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to show the modal
  const [programToDelete, setProgramToDelete] = useState(null); // Program to delete
  const navigate = useNavigate();

  // Fetch programs data from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "https://young-engineers-backk.onrender.com/api/programs"
        );
        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch programs.");
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Handle Delete - Show modal for confirmation
  const handleDelete = (programId) => {
    setProgramToDelete(programId);
    setShowModal(true);
  };

  // Confirm Deletion
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://young-engineers-backk.onrender.com/api/programs/${programToDelete}`
      );
      setPrograms(
        programs.filter((program) => program._id !== programToDelete)
      );
      setShowModal(false); // Close modal after deletion
    } catch (err) {
      setError("Unable to delete the program. Please try again.");
      setShowModal(false); // Close modal on error
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
          <span className="sr-only"></span>
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
        <button
          className="btn btn-primary"
          onClick={() => navigate("/program-form")}
        >
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
              <tr key={program._id}>
                <td>{program._id}</td>
                <td>{program.name}</td>
                <td>
                  {program.stages
                    ? program.stages.map((stage) => stage.name).join(", ")
                    : "No stages"}
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => handleViewDetails(program._id)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(program._id)}
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

      {/* Modal for Confirmation */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this program?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsList;
