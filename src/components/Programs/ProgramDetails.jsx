import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProgramDetails = () => {
  const { id } = useParams(); // Get program ID from URL
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch program details from the API
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(
          `https://young-engineers-backk.onrender.com/api/programs/${id}`
        );
        if (!response.ok) throw new Error("Program not found");

        const data = await response.json();
        setProgram(data);
      } catch (err) {
        setError("Unable to fetch program details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/programs")}
        >
          Back to Programs
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h1 className="card-title text-primary">{program.name}</h1>
          <p className="card-text">
            <strong>Description:</strong> {program.description}
          </p>
          <p className="card-text">
            <strong>Duration:</strong> {program.duration}
          </p>
          <p className="card-text">
            <strong>Start Date:</strong>{" "}
            {new Date(program.stages[0].createdAt).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>End Date:</strong>{" "}
            {new Date(program.updatedAt).toLocaleDateString()}
          </p>

          <h4 className="mt-4">Stages</h4>
          <ul className="list-group list-group-flush">
            {program.stages.map((stage) => (
              <li key={stage._id} className="list-group-item">
                <strong>{stage.name}:</strong> {stage.description}
              </li>
            ))}
          </ul>

          <button
            className="btn btn-outline-primary mt-4"
            onClick={() => navigate("/programs")}
          >
            Back to Programs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
