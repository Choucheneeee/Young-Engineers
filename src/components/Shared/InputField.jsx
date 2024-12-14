import React from "react";
import PropTypes from "prop-types";

const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  required = false, 
  disabled = false, 
  errorMessage = "" 
}) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-control ${errorMessage ? "is-invalid" : ""}`}
      />
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

// Define prop types for the component
InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputField;
