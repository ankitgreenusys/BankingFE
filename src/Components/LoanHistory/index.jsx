import React from "react";
import "./Styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [arrLoan, setArrLoan] = React.useState([]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    fetch(`${BaseURL}admin/loanbyuser/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) setArrLoan(data.loans);
        else alert("Error");
      })
      .catch((err) => console.log(err));
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const renderloanhistable = () => {
    return arrLoan?.loan ? (
      arrLoan.loan.map((dta, idx) => (
        <tr key={idx}>
          <td>{idx}.</td>
          <td>
            {dta.createdAt.split("T")[0].split("-").reverse().join("-")}
            {", "}
            {dta.createdAt.split("T")[1].split(".")[0]}
          </td>
          <td>
            {dta.giventransactionId
              ? dta.giventransactionId.transactionId
              : "-"}
          </td>
          <td>$ {dta.amount}</td>
          <td>{dta.modeOfPayment}</td>
          <td className="">{dta.status}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center">
          No Data Found
        </td>
      </tr>
    );
  };

  return (
    <div className="loanhistory pad90 mt-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="">
          <Link className="nav-link" to="/loanmanagement">
            <i className="fa-solid fa-arrow-left me-2"></i> {arrLoan?.name}
          </Link>
        </div>
        <div className="">
          <div className="btn btn-sm btn-green">Total Paid $ 2000</div>
          <div className="btn btn-sm btn-red ms-2">Remaining Amount $ 2000</div>
        </div>
      </div>
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Date & Time</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead></thead>
              <tbody>{renderloanhistable()}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
