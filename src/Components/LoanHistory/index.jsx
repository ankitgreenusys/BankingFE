import React from "react";
import "./Styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [arrLoan, setArrLoan] = React.useState([]);
  const [totpaid, setTotpaid] = React.useState(0);
  const [totremain, setTotremain] = React.useState(0);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    fetch(`${BaseURL}admin/loan/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setArrLoan(data.loan);
          setTotpaid(data.totalpaid);
          setTotremain(data.remaining);
        } else alert("Error");
      })
      .catch((err) => console.log(err));
  }, []);

  const renderloanhistable = () => {
    return arrLoan?.repaymenttransactionId?.length != 0 ? (
      arrLoan?.repaymenttransactionId?.map((dta, idx) => (
        <tr key={idx}>
          <td>{idx}.</td>
          <td>
            {dta.date.split("T")[0].split("-").reverse().join("-")}
            {", "}
            {dta.date.split("T")[1].split(".")[0]}
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
          {arrLoan?.status}
        </td>
      </tr>
    );
  };

  return (
    <div className="loanhistory pad90 mt-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="">
          <Link className="nav-link" to="/loanmanagement">
            <i className="fa-solid fa-arrow-left me-2"></i> {arrLoan?.user?.name}
          </Link>
        </div>
        <div className="">
          <div className="btn btn-sm btn-green">Total Paid $ {totpaid}</div>
          <div className="btn btn-sm btn-red ms-2">
            Remaining Amount $ {totremain}
          </div>
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
