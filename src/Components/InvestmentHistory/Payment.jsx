import React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentmethod, setPaymentmethod] = React.useState("cash");

  const setpayment = () => {
    console.log(paymentmethod);
    console.log(id);
    navigate(`/investment/history/${id}`);
  };

  return (
    <div className="createloan row mt-3 pad90">
      <div className="col-lg-6">
        <h5>Payment Methods</h5>
        <div className="d-flex flex-column">
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              id="cash"
              onChange={(e) => setPaymentmethod(e.target.id)}
              defaultChecked
            />
            <label className="" htmlFor="cash">
              Cash in hand
            </label>
          </div>
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              onChange={(e) => setPaymentmethod(e.target.id)}
              id="banktransfer"
            />
            <label className="" htmlFor="banktransfer">
              Bank Transfer
            </label>
          </div>
          <div className="my-3">
            <input
              type="radio"
              name="payment"
              id="other"
              onChange={(e) => setPaymentmethod(e.target.id)}
            />
            <label className="" htmlFor="other">
              Any other option
            </label>
          </div>
        </div>
        <div className="d-flex my-4">
          <button onClick={setpayment} className="ms-auto btn btn-sm btn-dark">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
