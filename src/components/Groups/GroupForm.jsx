import React, { useState } from "react";
import PropTypes from "prop-types";

const GroupForm = ({ onSubmit, groupData, programs }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    name: groupData?.name || "",
    program: groupData?.program || "",
    members: groupData?.members || [{ name: "", age: "" }],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle member changes
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  // Add a new member
  const addMember = () => {
    setFormData((prevState) => ({
      ...prevState,
      members: [...prevState.members, { name: "", age: "" }],
    }));
  };

  // Remove a member
  const removeMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "'Signika', sans-serif" }}>
      <h1 className="mb-4" style={{ fontWeight: 600 }}>
        {groupData ? "Edit Group" : "Create New Group"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Group Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ fontWeight: 400 }}>
            Group Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Associated Program */}
        <div className="mb-3">
          <label htmlFor="program" className="form-label" style={{ fontWeight: 400 }}>
            Associated Program
          </label>
          <select
            id="program"
            name="program"
            className="form-select"
            value={formData.program}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a program</option>
            {programs.map((program, index) => (
              <option key={index} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {/* Members */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: 400 }}>
            Members
          </label>
          {formData.members.map((member, index) => (
            <div key={index} className="d-flex mb-2 align-items-center">
              <input
                type="text"
                name="name"
                placeholder="Member Name"
                className="form-control me-2"
                value={member.name}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="form-control me-2"
                value={member.age}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeMember(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addMember}
          >
            Add Member
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {groupData ? "Save Changes" : "Create Group"}
        </button>
      </form>
    </div>
  );
};

GroupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  groupData: PropTypes.shape({
    name: PropTypes.string,
    program: PropTypes.string,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      })
    ),
  }),
  programs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GroupForm;
