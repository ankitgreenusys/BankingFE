import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

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
          <div className="btn btn-dark btn-sm mt-4">Export</div>
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
          <div className="btn btn-dark btn-sm mt-4">Export</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
