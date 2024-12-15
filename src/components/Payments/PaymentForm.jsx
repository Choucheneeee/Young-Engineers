import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ paymentId = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    date: "",
    paymentMethod: "",
    childId: "",
  });
  const [children, setChildren] = useState([]); // To store the list of children
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch children data
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          "https://young-engineers-backk.onrender.com/api/children"
        );
        setChildren(response.data); // Store children data in state
      } catch (err) {
        setError("Error fetching children data.");
      }
    };

    fetchChildren();
  }, []);

  // Fetch payment data for editing if paymentId is provided
  useEffect(() => {
    if (paymentId) {
      const fetchPayment = async () => {
        try {
          const response = await axios.get(
            `https://young-engineers-backk.onrender.com/api/payments/${paymentId}`
          );
          setFormData({
            amount: Number(response.data.amount), // Ensure amount is a number
            date: new Date(response.data.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
            paymentMethod: response.data.paymentMethod,
            childId: response.data.childId,
          });
        } catch (err) {
          setError("Error fetching payment data.");
        }
      };

      fetchPayment();
    }
  }, [paymentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChildSelect = (childId) => {
    setFormData({ ...formData, childId }); // Automatically set the childId in formData
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure amount is a number before submitting
    const dataToSubmit = { ...formData, amount: Number(formData.amount) };

    try {
      if (paymentId) {
        // Update payment
        await axios.put(
          `https://young-engineers-backk.onrender.com/api/payments/${paymentId}`,
          dataToSubmit
        );
      } else {
        // Create new payment
        await axios.post(
          "https://young-engineers-backk.onrender.com/api/payments",
          dataToSubmit
        );
      }

      setFormData({ amount: 0, date: "", paymentMethod: "", childId: "" });
      onSuccess && onSuccess(); // Call the success callback
      navigate("/payments");
    } catch (err) {
      setError("An error occurred while saving the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form container mt-4">
      <h2>{paymentId ? "Edit Payment" : "New Payment"}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            className="form-control"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select payment method</option>
            <option value="credit card">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="bank transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="childId">Child</label>
          <select
            className="form-control"
            id="childId"
            name="childId"
            value={formData.childId}
            onChange={(e) => handleChildSelect(e.target.value)} // Handle child selection
            required
          >
            <option value="">Select a child</option>
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name} - {child.schoolLevel}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : paymentId
            ? "Update Payment"
            : "Create Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
