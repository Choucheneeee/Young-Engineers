import React from "react";
import ProgramsList from "./components/Programs/ProgramsList";

const ProgramsPage = () => {
  return (
    <div className="container mt-5">
      <h1>Programs Management</h1>
      <p className="text-muted">
        View, edit, and manage all programs offered.
      </p>

      {/* ProgramsList Component */}
      <ProgramsList />
    </div>
  );
};

export default ProgramsPage;
