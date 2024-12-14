import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ groups, onGroupSelect }) => {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center text-muted">
        <p>No groups available.</p>
      </div>
    );
  }

  return (
    <ul className="list-group">
      {groups.map((group) => (
        <li
          key={group.id}
          className="list-group-item list-group-item-action"
          onClick={() => onGroupSelect(group)}
          style={{ cursor: "pointer", fontFamily: "'Signika', sans-serif", fontWeight: 400 }}
        >
          {group.name}
        </li>
      ))}
    </ul>
  );
};

GroupList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      program: PropTypes.string,
      members: PropTypes.array,
    })
  ).isRequired,
  onGroupSelect: PropTypes.func.isRequired,
};

export default GroupList;
