import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";
import exportFromJSON from "export-from-json";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const TransactionData = () => {
    fetch(`${BaseURL}admin/gettransaction`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        if (!dta.error) {
          const data = dta.transactions.map((ele) => {
            return {
              id: ele._id,
              userId: ele.userId._id,
              userName: ele.userId.name,
              userEmail: ele.userId.email,
              Amount: ele.amount,
              transactionId: ele.transactionId,
              transactionType: ele.transactionType,
              transactionDate: ele.date,
              Remark: ele.remark,
            };
          });

          const fileName = "TransactionReport";
          const exportType = exportFromJSON.types.csv;
          exportFromJSON({ data, fileName, exportType });
        } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  const UserData = () => {
    fetch(`${BaseURL}admin/allusers`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((dta) => {
        console.log(dta);
        const data = dta.users.map((ele) => {
          return {
            id: ele._id,
            name: ele.name,
            email: ele.email,
            phone: ele.mobile,
            joiningDate: ele.joiningDate,
            gender: ele.gender,
            dob: ele.dob,
            verified: ele.isVerified,
            balance: ele.balance,
            savingprofit: ele.savingprofit,
            totalDeposit: ele.totalDeposit,
            totalWithdraw: ele.totalWithdraw,
            totalProfit: ele.totalProfit,
          };
        });

        if (!dta.error) {
          const fileName = "UserReport";
          const exportType = exportFromJSON.types.csv;
          exportFromJSON({ data, fileName, exportType });
        } else alert("Error");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="repage mt-5 pad90">
      <div className="trnssec">
        <h6>Transaction Report</h6>
        <div className="w-50 mt-4">
          <div className="d-flex justify-content-between">
            <div className="my-3">
              <input
                type="radio"
                name="trnsrecord"
                id="trnslast28"
                defaultChecked
              />
              <label className="" htmlFor="trnslast28">
                Last 28 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="trnsrecord"
                id="trnslast14"
                defaultChecked
              />
              <label className="" htmlFor="trnslast14">
                Last 14 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="trnsrecord"
                id="trnslast7"
                defaultChecked
              />
              <label className="" htmlFor="trnslast7">
                Last 7 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="trnsrecord"
                id="trnscustom"
                defaultChecked
              />
              <label className="" htmlFor="trnscustom">
                Custom
              </label>
            </div>
          </div>
          <div onClick={TransactionData} className="btn btn-dark btn-sm mt-4">
            Export
          </div>
        </div>
      </div>
      <div className="usersec mt-5">
        <h6>User Accounts Report</h6>
        <div className="w-50 mt-4">
          <div className="d-flex justify-content-between">
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast28"
                defaultChecked
              />
              <label className="" htmlFor="userlast28">
                Last 28 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast14"
                defaultChecked
              />
              <label className="" htmlFor="userlast14">
                Last 14 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="userlast7"
                defaultChecked
              />
              <label className="" htmlFor="userlast7">
                Last 7 days
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="userrecord"
                id="usercustom"
                defaultChecked
              />
              <label className="" htmlFor="usercustom">
                Custom
              </label>
            </div>
          </div>
          <div onClick={UserData} className="btn btn-dark btn-sm mt-4">
            Export
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
