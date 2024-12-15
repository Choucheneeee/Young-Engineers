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
import ProgramsList from "./components/Programs/ProgramsList";
import GroupsPage from "./pages/GroupsPage";
import GroupForm from "./components/Groups/GroupForm";
import Login from "./components/Auth/LoginForm";
import AddParentForm from "./components/Parent/AddNewParent";
import DashboardParent from "./components/Parent/ParentDashboard";
// import ChildrenPage from "./pages/ChildrenPage";
// import PaymentsPage from "./pages/PaymentsPage";
import ChildrenPage from "./pages/ChildrenPage";
import PaymentForm from "./components/Payments/PaymentForm";
import FinancialReport from "./components/Payments/FinancialReport";
import ChildDetails from "./components/Children/ChildDetails";
import ChildForm from "./components/Children/ChildForm";

import ProgramForm from "./components/Programs/ProgramForm";
import ProgramDetails from "./components/Programs/ProgramDetails";
import PaymentsList from "./components/Payments/PaymentsList";
import EditPayment from "./components/Payments/EditPayment";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const test = "test";
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
            />
            <Route 
              path="/parents"
              element={
                isAuthenticated ? (
                  <DashboardParent />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route 
              path="/newparent"
              element={
                isAuthenticated ? (
                  <AddParentForm />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/payments" element={<PaymentsList />} />
            <Route path="/payment-form" element={<PaymentForm />} />
            <Route path="/payment-report" element={<FinancialReport />} />
            <Route path="/payment-edit/:paymentId" element={<EditPayment />} />

            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/child-details/:id" element={<ChildDetails />} />
            <Route path="/child-form" element={<ChildForm />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            <Route path="/programs" element={<ProgramsList />} />
            <Route path="/program-form" element={<ProgramForm />} />
            <Route path="/program-details/:id" element={<ProgramDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
