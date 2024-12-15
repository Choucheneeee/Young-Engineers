import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentsList = ({ onEdit, onDelete }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payments");
        setPayments(response.data);
      } catch (err) {
        setError("Unable to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
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
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Payments List</h2>
      {payments.length > 0 ? (
        <table className="table table-striped table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Payment ID</th>
              <th>Child ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              {onEdit || onDelete ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.childId}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.type}</td>
                {onEdit || onDelete ? (
                  <td>
                    {onEdit && (
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => onEdit(payment)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(payment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info mt-3" role="alert">
          No payments found.
        </div>
      )}
    </div>
  );
};

export default PaymentsList;
