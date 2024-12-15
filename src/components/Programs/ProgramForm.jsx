import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProgramForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      // Simulate fetching program details for editing
      const mockProgram = {
        id,
        name: "Sample Program",
        description: "This is a sample program.",
      };
      setFormData(mockProgram);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      alert(`Program with ID ${id} updated successfully!`);
    } else {
      alert("New program added successfully!");
    }
    navigate("/programs");
  };

  return (
    <div className="container mt-5">
      <h1>{id ? "Edit Program" : "Add Program"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Program Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {id ? "Update Program" : "Add Program"}
        </button>
      </form>
    </div>
  );
};

export default ProgramForm;
