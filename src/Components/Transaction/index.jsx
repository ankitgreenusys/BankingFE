import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [translist, setTranslist] = React.useState([]);
  const [totalprofit, setTotalprofit] = React.useState(0);
  const [totaldeposit, setTotaldeposit] = React.useState(0);
  const [totalwithdraw, setTotalwithdraw] = React.useState(0);

  React.useEffect(() => {
    fetch(BaseURL + "admin/gettransaction", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setTranslist(res.transactions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const rendercommntable = () =>
    translist.map((dta, idx) => (
      <tr key={idx}>
        <td>{idx}.</td>
        <td>{dta.userId.name}</td>
        <td>
          {dta.date.split("T")[0].split("-").reverse().join("-")} ,{" "}
          {dta.date.split("T")[1].split(".")[0]}
        </td>
        <td>{dta.transactionId}</td>
        <td>{dta.transactionType}</td>
        {/* <td className={dta.type === "Withdraw" ? "text-red" : "text-green"}> */}
        <td>{dta.amount}</td>
      </tr>
    ));

  return (
    <div className="transpage pad90 mt-4">
      <div className="w-50">
        <div className="d-flex justify-content-between">
          <div className="my-3">
            <input type="radio" name="record" id="overall" defaultChecked />
            <label className="" htmlFor="overall">
              Overall
            </label>
          </div>
          <div className="my-3">
            <input type="radio" name="record" id="last28" defaultChecked />
            <label className="" htmlFor="last28">
              Last 28 days
            </label>
          </div>
          <div className="my-3">
            <input type="radio" name="record" id="last14" defaultChecked />
            <label className="" htmlFor="last14">
              Last 14 days
            </label>
          </div>
          <div className="my-3">
            <input type="radio" name="record" id="last7" defaultChecked />
            <label className="" htmlFor="last7">
              Last 7 days
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <div className="btn btn-green">
            Total Profit <br /> ${totalprofit}
          </div>
          <div className="btn btn-blue">
            Total Deposit <br /> ${totaldeposit}
          </div>
          <div className="btn btn-red">
            Total Withdraw <br /> ${totalwithdraw}
          </div>
        </div>
      </div>
      <div className="recenttrans mt-5">
        <h6>Recent Transactions</h6>
        <div className="commntable mt-3">
          <section>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>User Name</th>
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
                  {translist.length > 0 ? (
                    rendercommntable()
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Data Found
                      </td>
                    </tr>
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
