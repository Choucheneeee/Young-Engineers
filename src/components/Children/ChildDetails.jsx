import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChildDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preload all images in the assets folder
  const images = import.meta.glob("../../assets/*.png", { eager: true });

  const getStickerImage = (stickerName) => {
    const imagePath = `../../assets/${stickerName}.png`;
    return images[imagePath]?.default || images["../../assets/default-sticker.png"]?.default;
  };

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://young-engineers-backk.onrender.com/api/children`);
        if (!response.ok) {
          throw new Error(`Failed to fetch child details: ${response.statusText}`);
        }
        const data = await response.json();
        const foundChild = data.find((c) => c._id === id);
        if (!foundChild) {
          throw new Error("Child not found");
        }
        setChild(foundChild);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetails();
  }, [id]);

  const isStickerEarned = (earnedAt) => {
    const currentDate = new Date();
    const earnedDate = new Date(earnedAt);
    return currentDate >= earnedDate;
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
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/children")}>
          Back to Children List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>{child.name}'s Details</h1>
      <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>School Level:</strong> {child.schoolLevel}</p>
      <p><strong>Group:</strong> {child.groupId || "Not Assigned"}</p>

      <h2 className="mt-4">Stickers</h2>
      <div className="row">
        {child.stickers && child.stickers.length > 0 ? (
          child.stickers.map((sticker) => (
            <div key={sticker._id} className="col-md-4 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={getStickerImage(sticker.model)}
                  className="card-img-top"
                  alt={sticker.model}
                  style={{
                    filter: isStickerEarned(sticker.earnedAt) ? "none" : "grayscale(100%)",
                    transition: "filter 0.3s",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{sticker.model}</h5>
                  <p className="card-text">
                    <strong>Earned At:</strong>{" "}
                    {new Date(sticker.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No stickers available.</p>
        )}
      </div>

      <button className="btn btn-secondary mt-4" onClick={() => navigate("/children")}>
        Back to Children List
      </button>
    </div>
  );
};

export default ChildDetails;
