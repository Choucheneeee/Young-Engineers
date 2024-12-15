import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinancialReport = () => {
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    payments: [],
  }); // Default state with fallback values
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFinancialReport = async () => {
      try {
        const response = await axios.get("/api/financial-report");
        setReportData(response.data || {
          totalRevenue: 0,
          totalExpenses: 0,
          payments: [],
        });
      } catch (err) {
        setError("Unable to fetch financial report.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialReport();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {error}
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/payments")}>
          Go Back to Payments
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Financial Report</h1>

      {/* Summary Section */}
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text">
                ${reportData.totalRevenue?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Expenses</h5>
              <p className="card-text">
                ${reportData.totalExpenses?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Net Profit</h5>
              <p className="card-text">
                ${(reportData.totalRevenue - reportData.totalExpenses)?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button to Navigate Back */}
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/payments")}>
          Back to Payments List
        </button>
      </div>

      {/* Detailed Payment Breakdown */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Payment Breakdown</h5>
        </div>
        <div className="card-body">
          {reportData.payments?.length > 0 ? (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {reportData.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                    <td>${payment.amount?.toFixed(2)}</td>
                    <td>{payment.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No payment records available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
