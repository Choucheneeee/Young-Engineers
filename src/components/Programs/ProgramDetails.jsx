import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProgramDetails = () => {
  const { id } = useParams(); // Get program ID from URL
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching program details
    const fetchProgramDetails = async () => {
      try {
        const staticPrograms = [
          { id: "1", name: "Math Program", description: "Advanced math classes for kids", duration: "3 months", startDate: "2024-01-15", endDate: "2024-04-15" },
          { id: "2", name: "Science Program", description: "Hands-on science experiments", duration: "2 months", startDate: "2024-02-01", endDate: "2024-03-31" },
          { id: "3", name: "Art Program", description: "Creative art workshops", duration: "1 month", startDate: "2024-03-01", endDate: "2024-03-31" },
        ];
        const foundProgram = staticPrograms.find((p) => p.id === id);
        if (!foundProgram) throw new Error("Program not found");
        setProgram(foundProgram);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [id]);

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
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/programs")}>
          Back to Programs
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>{program.name}</h1>
      <p><strong>Description:</strong> {program.description}</p>
      <p><strong>Duration:</strong> {program.duration}</p>
      <p><strong>Start Date:</strong> {new Date(program.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(program.endDate).toLocaleDateString()}</p>

      <button className="btn btn-secondary mt-4" onClick={() => navigate("/programs")}>
        Back to Programs
      </button>
    </div>
  );
};

export default ProgramDetails;
