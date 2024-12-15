import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardParent = () => {
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null); // For holding the selected parent to view/edit
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [newPassword, setNewPassword] = useState(""); // For handling the new password input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParents = async () => {
      const response = await fetch("https://young-engineers-backk.onrender.com/api/users"); // Replace with actual API
      const data = await response.json();
      const parentsData = data.filter((user) => user.role === "parent");
      console.log("Fetched parents:", parentsData);
      setParents(parentsData);
    };

    fetchParents();
  }, []);

  const handleAddParent = () => {
    navigate("/newparent"); // Navigate directly to the 'Add Parent' page
  };

  const handleViewParent = (parent) => {
    console.log("Selected parent:", parent);
    setSelectedParent(parent); // Set the selected parent
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedParent(null); // Clear selected parent
    setNewPassword(""); // Reset the new password field
  };

  const handleEditParent = async (e) => {
    e.preventDefault();

    if (!selectedParent || !selectedParent._id) {
      console.error("Parent ID is missing");
      return;
    }

    // If the password was changed, add the new hashed password
    const updatedParent = {
      ...selectedParent,
      password: newPassword || selectedParent.password, // Only update password if the new password is set
      updatedAt: new Date().toISOString(), // Set current date as updatedAt
    };

    // Send updated data to the backend
    await fetch(`https://young-engineers-backk.onrender.com/api/users/${selectedParent._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedParent),
    });

    // Close modal and update the parent list
    setShowModal(false);
    setParents((prevParents) =>
      prevParents.map((parent) =>
        parent._id === selectedParent._id ? updatedParent : parent
      )
    );
  };

  const handleDeleteParent = async (_id) => {
    // Send delete request to the backend
    await fetch(`https://young-engineers-backk.onrender.com/api/users/${_id}`, {
      method: "DELETE",
    });

    // Remove deleted parent from the list
    setParents((prevParents) => prevParents.filter((parent) => parent._id !== _id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Parents Dashboard</h2>
      <button onClick={handleAddParent} className="btn btn-primary mb-3">
        Create New Parent
      </button>

      {/* Parent List Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Parent ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent._id}>
              <td>{parent._id}</td>
              <td>{parent.name}</td>
              <td>{parent.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleViewParent(parent)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteParent(parent._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing and editing parent */}
      {showModal && selectedParent && (
        <div
          className="modal show"
          style={{ display: "block" }}
          onClick={handleCloseModal}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Parent Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleEditParent}>
                <div className="modal-body">
                  {/* Form Fields for Editing */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={selectedParent.name}
                      onChange={(e) =>
                        setSelectedParent({
                          ...selectedParent,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={selectedParent.email}
                      onChange={(e) =>
                        setSelectedParent({
                          ...selectedParent,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (leave empty to keep current)"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="createdAt" className="form-label">
                      Created At
                    </label>
                    <input
                      type="text"
                      id="createdAt"
                      className="form-control"
                      value={selectedParent.createdAt}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="updatedAt" className="form-label">
                      Updated At
                    </label>
                    <input
                      type="text"
                      id="updatedAt"
                      className="form-control"
                      value={selectedParent.updatedAt}
                      disabled
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardParent;
