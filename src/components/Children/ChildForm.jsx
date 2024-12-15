import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChildForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    group: "",
  });

  useEffect(() => {
    if (id) {
      // Simulate fetching child details for editing
      const mockChild = {
        id,
        name: "John Doe",
        age: 8,
        group: "Group A",
      };
      setFormData(mockChild);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      alert(`Child with ID ${id} updated successfully!`);
    } else {
      alert("New child added successfully!");
    }
    navigate("/children");
  };

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
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Group</label>
          <input
            type="text"
            className="form-control"
            value={formData.group}
            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          {id ? "Update Child" : "Add Child"}
        </button>
      </form>
    </div>
  );
};

export default ChildForm;
