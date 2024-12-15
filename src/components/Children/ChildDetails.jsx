import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChildDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching child details for testing
    const fetchChildDetails = async () => {
      try {
        const staticChildren = [
          { id: "1", name: "John Doe", age: 8, group: "Group A", hobbies: "Drawing, Reading" },
          { id: "2", name: "Jane Smith", age: 10, group: "Group B", hobbies: "Swimming, Dancing" },
          { id: "3", name: "Emily Johnson", age: 9, group: "Group A", hobbies: "Music, Sports" },
        ];
        const foundChild = staticChildren.find((c) => c.id === id);
        if (!foundChild) throw new Error("Child not found");
        setChild(foundChild);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetails();
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
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/children")}>
          Back to Children List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>{child.name}'s Details</h1>
      <p><strong>Age:</strong> {child.age}</p>
      <p><strong>Group:</strong> {child.group}</p>
      <p><strong>Hobbies:</strong> {child.hobbies}</p>

      <button className="btn btn-secondary mt-4" onClick={() => navigate("/children")}>
        Back to Children List
      </button>
    </div>
  );
};

export default ChildDetails;