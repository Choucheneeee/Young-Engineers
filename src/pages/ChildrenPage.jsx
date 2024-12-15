import React from "react";
import ChildrenList from "../components/Children/ChildrenList";

const ChildrenPage = () => {
  return (
    <div className="container mt-5">
      <h1>Children Management</h1>
      <p className="text-muted">View, edit, and manage children records below.</p>

      {/* ChildrenList Component */}
      <ChildrenList />
    </div>
  );
};

export default ChildrenPage;
