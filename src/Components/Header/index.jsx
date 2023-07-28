import React from "react";
import "./Styles.css";

import { NavLink, Link, Outlet } from "react-router-dom";

import Avapic from "../../assest/img/ava.jpg";

const Index = (props) => {
  const [islogin, setIsLogin] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (props.login) {
      setIsLogin(true);
      setName(user?.name);
    } else setIsLogin(false);
  }, [props.login]);

  return (
    <>
      <div className="">
        <div
          className={
            "mainheader navbar pad90 " +
            (islogin ? " " : "justify-content-center")
          }
          data-bs-theme="dark"
        >
          <div className="comname">Banking Committee App</div>
          {islogin && (
            <div>
              <ul className="navbar-nav d-flex justify-content-between flex-row w-100">
                <li className="nav-item">
                  <Link className="nav-link mx-3 bal" to="yourbalance">
                    <i className="fa-solid fa-wallet"></i> $245,254.00
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-3" href="#">
                    <i className="fa-solid fa-gear"></i> Setting
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <span
                    className="nav-link ms-3 dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img className="avatar" src={Avapic} alt="" />
                    <span className="name">{name}</span>
                  </span>
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
                </li>
              </ul>
            </div>
          )}
        </div>
        {islogin && (
          <nav className="navbar navbar-expand-lg subnav pad90">
            <div className="container-fluid px-0">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav d-flex justify-content-between w-100">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      <i className="fa-solid fa-users"></i> Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="users">
                      <i className="fa-solid fa-users"></i> Users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="loanmanagement">
                      <i className="fa-solid fa-hand-holding-dollar"></i> Loan
                      Management
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="investment">
                      <i className="fa-solid fa-signal"></i> Investment
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="transaction">
                      <i className="fa-solid fa-arrow-right-arrow-left"></i>{" "}
                      Transaction
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="reports">
                      <i className="fa-solid fa-book"></i> Reports
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="customersupport">
                      <i className="fa-solid fa-question"></i> Customer Support
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Index;
