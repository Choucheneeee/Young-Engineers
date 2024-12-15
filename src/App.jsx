import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Dashboard/Sidebar";
import DashboardPage from "./pages/DashboardPage";
// import ProgramsPage from "./pages/ProgramsPage";
import GroupsPage from "./pages/GroupsPage";
import GroupForm from "./components/Groups/GroupForm";
import Login from "./components/Auth/LoginForm";
// import ChildrenPage from "./pages/ChildrenPage";
import FinancialReportPage from "./pages/FinancialReportPage";
import PaymentForm from "./components/Payments/PaymentForm";
import FinancialReport from "./components/Payments/FinancialReport";
import PaymentsList from "./pages/FinancialReportPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <Router>
      <div className="d-flex">
        {/* Show Sidebar only if the user is authenticated */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div
          className="container-fluid"
         
        >
          <Routes>
            {/* Redirect to dashboard if already authenticated */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/groups"
              element={
                isAuthenticated ? (
                  <GroupsPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/group-form"
              element={
                isAuthenticated ? (
                  <GroupForm
                    onSubmit={(data) => console.log(data)}
                    programs={["Bricks Challenge", "Coding Challenge"]}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* Fallback route */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            /><Route path="/payments" element={<PaymentsList />} />
            <Route path="/payment-form" element={<PaymentForm />} />
            <Route path="/payment-report" element={<FinancialReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
