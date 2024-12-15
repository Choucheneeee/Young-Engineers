import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";
import DashboardPage from "./pages/DashboardPage";
// import ProgramsPage from "./pages/ProgramsPage";
import GroupsPage from "./pages/GroupsPage";
import GroupForm from "./components/Groups/GroupForm";
// import ChildrenPage from "./pages/ChildrenPage";
// import PaymentsPage from "./pages/PaymentsPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/programs" element={<ProgramsPage />} /> */}
            <Route path="/groups" element={<GroupsPage />} />
            <Route
              path="/group-form"
              element={
                <GroupForm
                  onSubmit={(data) => console.log(data)}
                  programs={["Bricks Challenge", "Coding Challenge"]}
                />
              }
            />
            {/* <Route path="/children" element={<ChildrenPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
