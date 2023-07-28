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

  React.useEffect(() => {
    fetch(BaseURL + "admin/adminTransactionHistory?userId=" + user.id, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.responseCode === 200) setTranslist(res.responsResult);
        else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const rendercommntable = () =>
    translist.map((dta, idx) => (
      <tr>
        <td>{idx}.</td>
        <td>Cheyenne Vaccaro</td>
        <td>22 Jan 23, 21:24</td>
        <td>1246792349413645476</td>
        <td>Withdraw</td>
        <td className={idx % 2 ? "text-red" : "text-green"}>$200</td>
      </tr>
    ));

  return (
    <div className="ybalpage pad90 mt-5">
      <div className="ybalhead">
        <h6 className="text-red">Your Balance</h6>
        <div className="d-flex align-items-center mt-1">
          <h4>$245,254.00</h4>
          <div className="btn btn-sm btn-red ms-4">Withdrawal</div>
        </div>
      </div>
      <div className="recenttrans mt-5">
        <div className="d-flex justify-content-between">
          <h6>Recent Transactions</h6>
          <button className="btn btn-dark btn-sm">Export</button>
        </div>
        <div className="commntable mt-3">
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
