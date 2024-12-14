import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "md", message = "Loading..." }) => {
  const sizes = {
    sm: "spinner-border-sm", // Small size
    md: "",                 // Default size
    lg: "spinner-border-lg" // Large size
  };

  return (
    <div className="text-center">
      <div className={`spinner-border text-primary ${sizes[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <div className="mt-2 font-light">{message}</div>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  message: PropTypes.string
};

export default LoadingSpinner;
