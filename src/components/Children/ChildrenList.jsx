import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Static children data for testing
    const fetchChildren = () => {
      try {
        const staticChildren = [
          { id: "1", name: "John Doe", age: 8, group: "Group A" },
          { id: "2", name: "Jane Smith", age: 10, group: "Group B" },
          { id: "3", name: "Emily Johnson", age: 9, group: "Group A" },
        ];
        setChildren(staticChildren);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch children.");
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Handle Delete
  const handleDelete = (childId) => {
    if (window.confirm("Are you sure you want to delete this child?")) {
      setChildren(children.filter((child) => child.id !== childId));
    }
  };

  // Handle Edit
  const handleEdit = (childId) => {
    navigate(`/child-form/${childId}`);
  };

  // Handle View Details
  const handleViewDetails = (childId) => {
    navigate(`/child-details/${childId}`);
  };

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
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Children List</h2>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/child-form")}>
          Add Child
        </button>
      </div>

      {/* Children Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Child ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {children.length > 0 ? (
            children.map((child) => (
              <tr key={child.id}>
                <td>{child.id}</td>
                <td>{child.name}</td>
                <td>{child.age}</td>
                <td>{child.group}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(child.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    onClick={() => handleDelete(child.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDetails(child.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No children found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenList;
