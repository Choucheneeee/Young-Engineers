import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProgramEdit = () => {
  const { id } = useParams(); // Program ID from URL
  const navigate = useNavigate();

  // State for the form data (program and stages)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    stages: [
      {
        name: "",
        description: "",
        completedBy: [], // Array for user IDs assigned to the stage
      },
    ],
  });

  // Fetch program data when component is mounted or `id` changes
  useEffect(() => {
    if (id) {
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

  // Handle form submission (updating the program)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const programData = {
      name: formData.name,
      description: formData.description,
      duration: formData.duration,
      stages: formData.stages.map((stage) => ({
        ...stage,
        completedBy: stage.completedBy.map((id) => id.trim()), // Clean up IDs
      })),
    };

    try {
      // Update existing program
      await axios.put(
        `https://young-engineers-backk.onrender.com/api/programs/${id}`,
        programData
      );
      navigate("/programs"); // Redirect to the program list page after updating
    } catch (error) {
      console.error("Error updating program", error);
    }
  };

  // Handle changes in form fields (program fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle changes in stage fields
  const handleStageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStages = [...formData.stages];

    if (name === "completedBy") {
      // Convert the comma-separated list to an array of IDs
      updatedStages[index][name] = value.split(",").map((id) => id.trim());
    } else {
      updatedStages[index][name] = value;
    }

    setFormData({ ...formData, stages: updatedStages });
  };

  // Add a new stage to the form
  const addStage = () => {
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        {
          name: "",
          description: "",
          completedBy: [], // Empty array for the new stage
        },
      ],
    });
  };

  // Remove a stage from the form
  const removeStage = (index) => {
    const updatedStages = formData.stages.filter((_, i) => i !== index);
    setFormData({ ...formData, stages: updatedStages });
  };

  return (
    <div className="container mt-5">
      <h1>Edit Program</h1>
      <form onSubmit={handleSubmit}>
        {/* Program Name */}
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

        {/* Program Description */}
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

        {/* Program Duration */}
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

              {/* Completed By - User IDs */}
              <div className="form-group mt-2">
                <label>Completed By (User IDs)</label>
                <input
                  type="text"
                  className="form-control"
                  name="completedBy"
                  value={stage.completedBy.join(", ")} // Display user IDs as comma-separated
                  onChange={(e) => handleStageChange(index, e)}
                  placeholder="Enter user IDs, separated by commas"
                />
              </div>

              {/* Remove Stage Button */}
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => removeStage(index)}
              >
                Remove Stage
              </button>
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
          Update Program
        </button>
      </form>
    </div>
  );
};

export default ProgramEdit;
