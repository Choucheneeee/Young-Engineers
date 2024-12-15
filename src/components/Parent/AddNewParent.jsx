import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook

const AddParentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childrenList, setChildrenList] = useState([]); // List fetched from the database
  const [selectedChildren, setSelectedChildren] = useState([""]); // Initialize with one empty child value
  const role = "parent"; // Predefined role
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch children from the database when the component loads
  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch("https://young-engineers-backk.onrender.com/api/children"); // Replace with actual API endpoint
      const data = await response.json();
      setChildrenList(data);
    };

    fetchChildren();
  }, []);

  // Add child to the selected list (when "Add Another Child" is clicked)
  const handleAddChild = () => {
    setSelectedChildren([...selectedChildren, ""]); // Add a new empty string to represent a new select
  };

  // Handle selection of child from dropdown
  const handleSelectChild = (index, value) => {
    const updatedChildren = [...selectedChildren];
    updatedChildren[index] = value; // Update the specific child at the index
    setSelectedChildren(updatedChildren);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form data to be sent to the backend
    const formData = {
      name,
      email,
      password,
      children: selectedChildren,
      role,
    };

    console.log("Submitting form:", formData);

    // You can replace this with an API call to save the parent
    fetch("https://young-engineers-backk.onrender.com/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Parent added successfully!");
        console.log("Response:", data);
        navigate("/parents");  // Navigate to the /parents page
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add parent.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Parent</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Children Selection */}
        <div className="mb-3">
          <label htmlFor="children" className="form-label">
            Select Children
          </label>

          {/* Render select for each child */}
          {selectedChildren.map((child, index) => (
            <div key={index} className="mb-3">
              <select
                value={child}
                onChange={(e) => handleSelectChild(index, e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a Child</option>
                {childrenList.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Button to add another child */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddChild}
          >
            Add Another Child
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          Add Parent
        </button>
      </form>
    </div>
  );
};

export default AddParentForm;
  