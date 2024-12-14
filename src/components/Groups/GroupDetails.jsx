import React from "react";
import PropTypes from "prop-types";

const GroupDetails = ({ group }) => {
  if (!group) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">Group not found or no details available.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ fontFamily: "'Signika', sans-serif" }}>
      <h1 className="mb-4" style={{ fontWeight: 600 }}>
        Group Details: {group.name}
      </h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: 400 }}>
            Associated Program:
          </h5>
          <p className="card-text">{group.program}</p>

          <h5 className="card-title" style={{ fontWeight: 400 }}>
            Number of Members:
          </h5>
          <p className="card-text">{group.members.length}</p>

          <h5 className="card-title" style={{ fontWeight: 400 }}>
            Members:
          </h5>
          <ul>
            {group.members.map((member, index) => (
              <li key={index} style={{ fontWeight: 300 }}>
                {member.name} ({member.age} years old)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

GroupDetails.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    program: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
};

export default GroupDetails;
