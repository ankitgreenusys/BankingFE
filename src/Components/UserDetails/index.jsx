import React from "react";
import "./Styles.css";

import { useParams, Link, useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = React.useState({});
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (id) {
      fetch(`${BaseURL}admin/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            setUser(data.myuser);
            setTransactions(data.myuser.transactions);
          } else {
            alert("Error");
            navigate("/users");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
          navigate("/users");
        });
    }
  }, [id]);

  const rendercommntable = () =>
    transactions.map((dt, idx) => (
      <tr key={idx}>
        <td>{idx + 1}.</td>
        <td>
          {dt.date?.split("T")[0].split("-").reverse().join("-") +
            ", " +
            dt.date?.split("T")[1].split(".")[0]}
        </td>
        <td>{dt.transactionId}</td>
        <td>{dt.transactionType}</td>
        <td>{dt.amount}</td>
      </tr>
    ));

  return (
    <div className="createuserform pad90 mt-5">
      <div className="page2">
        <div className="mb-3">
          <Link to="/users">
            <i className="fa-solid fa-arrow-left"></i> Back
          </Link>
        </div>
        <div className="d-flex w-75  justify-content-between">
          <div className="">
            <p>Full Name</p>
            <h6>
              {user?.name} <br />{" "}
              {user?.isVerified ? (
                <span className="text-green">Verified</span>
              ) : (
                <span className="text-red">Unverified</span>
              )}
            </h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Date of Birth</p>
            <h6>{
            user.dob?.split("T")[0].split("-").reverse().join("-")
            }</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Email Address</p>
            <h6>{user?.email}</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Phone Number</p>
            <h6>{user?.mobile}</h6>
          </div>
          <div className="divder"></div>
          <div className="">
            <p>Submitted Documents</p>
            <h6>
              <i className="fa-solid fa-file-invoice"></i> Profile ID Cad <br />
              <a target="_blank" rel="noreferrer" href={user?.image}>
                View
              </a>
            </h6>
          </div>
        </div>
        <h6 className="text-red mt-5">Investment Portfolio</h6>
        <div className="d-flex mt-4">
          <div className="btn btn-blue me-5">
            Total Deposit <br /> ${user?.totalDeposit}
          </div>
          <div className="btn btn-red">
            Total Withdraw <br /> ${user?.totalWithdraw}
          </div>
        </div>
        <h6 className="mt-5 d-flex justify-content-between">
          <div className="text-red">Transactions</div>
          <button className="btn btn-dark btn-sm">Export</button>
        </h6>
        <div className="commntable">
          <section>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Date & Time</th>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5">No Transactions</td>
                    </tr>
                  ) : (
                    rendercommntable()
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
