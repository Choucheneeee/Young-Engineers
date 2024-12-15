import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupDetails from "../components/Groups/GroupDetails";

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups] = useState([
    {
      id: 1,
      name: "Group Alpha",
      program: "Bricks Challenge",
      members: [
        { name: "Alice", age: 10 },
        { name: "Bob", age: 12 },
        { name: "Charlie", age: 11 },
      ],
    },
    {
      id: 2,
      name: "Group Beta",
      program: "Coding Challenge",
      members: [
        { name: "David", age: 9 },
        { name: "Eve", age: 10 },
        { name: "Frank", age: 11 },
      ],
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = () => {
    navigate("/group-form");
  };

  return (
    <div
      className="container mt-5"
      style={{ fontFamily: "'Signika', sans-serif" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontWeight: 600 }}>Groups</h1>
        <button className="btn btn-primary" onClick={handleCreateGroup}>
          Create New Group
        </button>
      </div>
      <div className="row">
        {/* Group List */}
        <div className="col-md-4">
          <ul className="list-group">
            {groups.map((group) => (
              <li
                key={group.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleGroupClick(group)}
                style={{ cursor: "pointer" }}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Group Details */}
        <div className="col-md-8">
          {selectedGroup ? (
            <GroupDetails group={selectedGroup} />
          ) : (
            <p className="text-muted">Select a group to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
