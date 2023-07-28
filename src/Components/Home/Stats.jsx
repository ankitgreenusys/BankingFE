import React from "react";

import BaseURL from "../../Api/BaseURL";

const Stats = () => {
  const [totalMember, setTotalMember] = React.useState(0);
  const [totalLoan, setTotalLoan] = React.useState(0);
  const [totalInterest, setTotalInterest] = React.useState(0);
  const [yeildInvestment, setYeildInvestment] = React.useState(0);

  React.useEffect(() => {
    fetch(BaseURL + "admin/statsdashboard", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setTotalMember(res.totalmember);
          setTotalLoan(res.totalloan);
          setTotalInterest(res.totalinterest.toFixed(2));
          setYeildInvestment(res.totalyield);
        }
        // else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="dropdown">
        <p
          className="dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Today
        </p>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-between">
        <div className="statscard statscardcolor1">
          <div className="statscardbody">
            <p className="statstitle">Total Member</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="statsval m-0 p-0">{totalMember.toLocaleString()}</p>
              <p className="statsgrowth m-0 p-0">
                +11.01% <i className="fa-solid fa-arrow-trend-up"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="statscard statscardcolor2">
          <div className="statscardbody">
            <p className="statstitle">Total Loan</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="statsval m-0 p-0">{totalLoan.toLocaleString()}</p>
              <p className="statsgrowth m-0 p-0">
                +11.01% <i className="fa-solid fa-arrow-trend-up"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="statscard statscardcolor1">
          <div className="statscardbody">
            <p className="statstitle">Total Interest</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="statsval m-0 p-0">
                {totalInterest.toLocaleString()}
              </p>
              <p className="statsgrowth m-0 p-0">
                +11.01% <i className="fa-solid fa-arrow-trend-up"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="statscard statscardcolor2">
          <div className="statscardbody">
            <p className="statstitle">Yield of the investment</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="statsval m-0 p-0">
                {yeildInvestment.toLocaleString()}
              </p>
              <p className="statsgrowth m-0 p-0">
                +11.01% <i className="fa-solid fa-arrow-trend-up"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
