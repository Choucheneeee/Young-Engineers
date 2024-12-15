import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PaymentsList = () => {
  // Static data for testing
  const staticPayments = [
    {
      id: "1",
      childId: "12345",
      date: "2024-12-01",
      amount: 100.5,
      type: "Tuition Fee",
    },
    {
      id: "2",
      childId: "67890",
      date: "2024-12-05",
      amount: 200.0,
      type: "Material Fee",
    },
    {
      id: "3",
      childId: "54321",
      date: "2024-12-10",
      amount: 150.0,
      type: "Miscellaneous",
    },
  ];

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching with static data
    const fetchPayments = () => {
      try {
        setPayments(staticPayments); // Use static data here
        setLoading(false);
      } catch (err) {
        setError("Error loading payments.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle Delete
  const handleDelete = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      setPayments(payments.filter((payment) => payment.id !== paymentId));
    }
  };

  // Handle Edit
  const handleEdit = (paymentId) => {
    navigate(`/payment-form/${paymentId}`);
  };

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
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Title */}
      <h2>Payments List</h2>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4 mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/payment-form")}>
          Add Payment
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/payment-report")}>
          View Financial Summary
        </button>
      </div>

      {/* Payments Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Payment ID</th>
            <th>Child ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.childId}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.type}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(payment.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(payment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsList;
