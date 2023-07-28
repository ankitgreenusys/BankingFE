import React from "react";
import "./Styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [investment, setInvestment] = React.useState([]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(BaseURL + "admin/investment/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setInvestment(res.investments);
        else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const renderloanhistable = () =>
    investment?.investment ? (
      investment.investment.map((dta, idx) => (
        <tr>
          <td>{idx + 1}.</td>
          <td>
            {dta?.date.split("T")[0].split("-").reverse().join("-")} ,{" "}
            {dta?.date.split("T")[1].split(".")[0]}
          </td>
          <td>{Math.floor(100000000 + Math.random() * 900000000)}</td>
          <td>$ {dta?.amount}</td>
          <td>{dta?.savingProfit}</td>
          <td className="">Paid</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center">
          No Data Found
        </td>
      </tr>
    );

  return (
    <div className="loanhistory pad90 mt-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="">
          <Link className="nav-link" to="/investment">
            <i className="fa-solid fa-arrow-left"></i>{" "}
            {investment?.name}
          </Link>
        </div>
        <div className="">
          <div className="btn btn-sm btn-green">Total Deposit $ 20000</div>
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
