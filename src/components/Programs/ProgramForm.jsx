import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProgramForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state for form data, including duration
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "", // Add duration field to the form state
    stages: [
      {
        name: "",
        description: "",
        completedBy: [],
      },
    ],
  });

  // Fetch program details if editing an existing program
  useEffect(() => {
    if (id) {
      // Fetch program data from API
      const fetchProgramData = async () => {
        try {
          const response = await axios.get(
            `https://young-engineers-backk.onrender.com/api/programs/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching program details", error);
        }
      };
      fetchProgramData();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const programData = {
      name: formData.name,
      description: formData.description,
      duration: formData.duration, // Include the duration in the data sent to the backend
      stages: formData.stages,
    };

    try {
      if (id) {
        // Update the existing program
        await axios.put(
          `https://young-engineers-backk.onrender.com/api/programs/${id}`,
          programData
        );
      } else {
        // Create a new program
        await axios.post(
          "https://young-engineers-backk.onrender.com/api/programs",
          programData
        );
      }
      navigate("/programs");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle stage input changes
  const handleStageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStages = [...formData.stages];
    updatedStages[index][name] = value;
    setFormData({ ...formData, stages: updatedStages });
  };

  // Add a new stage input field
  const addStage = () => {
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        {
          name: "",
          description: "",
          completedBy: [],
        },
      ],
    });
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Duration */}
        <div className="form-group mt-3">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 36 weeks"
            required
          />
        </div>

        {/* Stages */}
        <div className="mt-4">
          <h4>Stages</h4>
          {formData.stages.map((stage, index) => (
            <div key={index} className="border p-3 mb-3">
              <div className="form-group">
                <label>Stage Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={stage.name}
                  onChange={(e) => handleStageChange(index, e)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={stage.description}
                  onChange={(e) => handleStageChange(index, e)}
                  required
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addStage}
          >
            Add Stage
          </button>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          {id ? "Update Program" : "Add Program"}
        </button>
      </form>
    </div>
  );
};

export default ProgramForm;
