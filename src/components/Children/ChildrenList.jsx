import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch children from the database
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch(
          "https://young-engineers-backk.onrender.com/api/children"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch children.");
        }
        const data = await response.json();
        setChildren(data);

        // Fetch groups based on group IDs
        const groupIds = [...new Set(data.map((child) => child.groupId))];
        const groupPromises = groupIds.map((id) =>
          fetch(`https://young-engineers-backk.onrender.com/api/groups/${id}`)
            .then((res) => res.json())
            .then((group) => ({ id, name: group.name }))
        );

        const groupData = await Promise.all(groupPromises);
        const groupMap = groupData.reduce((acc, group) => {
          acc[group.id] = group.name;
          return acc;
        }, {});
        setGroups(groupMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Handle Delete
  const handleDelete = async (childId) => {
    if (window.confirm("Are you sure you want to delete this child?")) {
      try {
        const response = await fetch(
          `https://young-engineers-backk.onrender.com/api/children/${childId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete child.");
        }
        setChildren(children.filter((child) => child._id !== childId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Handle Edit
  const handleEdit = (childId) => {
    navigate(`/child-form/${childId}`);
  };

  // Handle View Details
  const handleViewDetails = (childId) => {
    console.log(childId,"childId")
    navigate(`/child-details/${childId}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
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
        <button
          className="btn btn-primary"
          onClick={() => navigate("/child-form")}
        >
          Add Child
        </button>
      </div>

      {/* Children Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Child ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {children.length > 0 ? (
            children.map((child) => (
              <tr key={child._id}>
                <td>{child._id}</td>
                <td>{child.name}</td>
                <td>{child.dateOfBirth}</td>
                <td>{calculateAge(child.dateOfBirth)}</td>
                <td>{groups[child.groupId] || "Loading..."}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(child._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    onClick={() => handleDelete(child._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDetails(child._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
