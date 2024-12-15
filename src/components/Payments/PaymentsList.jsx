import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Modal components from react-bootstrap

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [paymentToDelete, setPaymentToDelete] = useState(null); // Store payment to delete
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "https://young-engineers-backk.onrender.com/api/payments"
        );
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading payments.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle Delete
  const handleDelete = async () => {
    if (paymentToDelete) {
      try {
        await axios.delete(
          `https://young-engineers-backk.onrender.com/api/payments/${paymentToDelete}`
        );
        setPayments(
          payments.filter((payment) => payment._id !== paymentToDelete)
        );
        setShowModal(false); // Close the modal after successful deletion
      } catch (err) {
        setError("Error deleting payment.");
      }
    }
  };

  // Show the confirmation modal
  const confirmDelete = (paymentId) => {
    setPaymentToDelete(paymentId);
    setShowModal(true);
  };

  // Handle Edit
  const handleEdit = (paymentId) => {
    navigate(`/payment-edit/${paymentId}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
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

      <div className="d-flex justify-content-between mt-4 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/payment-form")}
        >
          Add Payment
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/payment-report")}
        >
          View Financial Summary
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Payment ID</th>
              <th>Child Name</th>
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
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>{payment.childId ? payment.childId.name : "N/A"}</td>
                  <td>{payment.childId ? payment.childId._id : "N/A"}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleEdit(payment._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(payment._id)} // Trigger modal on delete
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this payment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentsList;
