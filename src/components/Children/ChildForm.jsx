import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChildForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    schoolLevel: "",
    groupId: "",
    parentId: "",
    stickers: [
      {
        model: "",
        earnedAt: "",
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the API request
    const payload = {
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      schoolLevel: formData.schoolLevel,
      groupId: formData.groupId,
      parentId: formData.parentId,
      stickers: formData.stickers,
    };

    try {
      if (id) {
        // If there's an ID, you could make a PUT request for updating an existing child (if required)
        alert(`Child with ID ${id} updated successfully!`);
      } else {
        // Send POST request to add a new child
        const response = await fetch(
          "https://young-engineers-backk.onrender.com/api/children",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          alert("New child added successfully!");
          navigate("/children");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error adding/updating child:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      // Simulate fetching child details for editing if ID is present
      const mockChild = {
        id,
        name: "John Doe",
        dateOfBirth: "2010-04-15T00:00:00Z",
        schoolLevel: "Grade 3",
        groupId: "60d5b9d1b915d4a3a2f9e63c",
        parentId: "60d5b9f7b915d4a3a2f9e63d",
        stickers: [
          {
            model: "Carrousel",
            earnedAt: "2024-12-15T10:00:00Z",
          },
        ],
      };
      setFormData(mockChild);
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1>{id ? "Edit Child" : "Add Child"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>School Level</label>
          <input
            type="text"
            className="form-control"
            value={formData.schoolLevel}
            onChange={(e) =>
              setFormData({ ...formData, schoolLevel: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Group ID</label>
          <input
            type="text"
            className="form-control"
            value={formData.groupId}
            onChange={(e) =>
              setFormData({ ...formData, groupId: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Parent ID</label>
          <input
            type="text"
            className="form-control"
            value={formData.parentId}
            onChange={(e) =>
              setFormData({ ...formData, parentId: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Stickers</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Sticker model"
              value={formData.stickers[0].model}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stickers: [
                    { ...formData.stickers[0], model: e.target.value },
                  ],
                })
              }
              required
            />
            <input
              type="datetime-local"
              className="form-control ml-2"
              value={formData.stickers[0].earnedAt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stickers: [
                    { ...formData.stickers[0], earnedAt: e.target.value },
                  ],
                })
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          {id ? "Update Child" : "Add Child"}
        </button>
      </form>
    </div>
  );
};

export default ChildForm;
