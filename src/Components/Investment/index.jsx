import React from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const [investment, setInvestment] = React.useState([]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(BaseURL + "admin/allinvestment", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setInvestment(res.investments);
        else alert(res.error);
      })
      .catch((err) => console.log(err));
  }, []);

  const rendercommntable = () =>
    investment.map((dta, idx) => (
      <tr>
        <td>{idx + 1}.</td>
        <td>{dta.name}</td>
        <td colSpan={2}>{dta._id}</td>
        <td>
          {dta.investment.length === 0
            ? "No Investment"
            : dta?.investment[dta?.investment.length - 1].savingProfit}
        </td>
        <td>
          {dta.investment.length === 0
            ? "No Payment"
            : dta?.investment[dta?.investment.length - 1].date
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
        </td>
        <td>
          <div className="btn btn-sm btn-blue">
            <Link className="nav-link" to={"history/" + dta._id}>
              View Details
            </Link>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="investmentpage pad90 mt-3">
      <div className="commntable">
        <section>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th> </th>
                  <th>Saving Product</th>
                  <th>Last Payment Date</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>{rendercommntable()}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
