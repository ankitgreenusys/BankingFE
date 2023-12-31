import React from "react";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [selmem, setSelmem] = React.useState(false);
  const [page1fil, setPagefil] = React.useState(false);
  const [userlist, setUserlist] = React.useState([]);
  const [formdata, setFormdata] = React.useState({
    loanproduct: "",
    loanamount: "",
    interesttype: "",
    loanterm: "",
    repaymentfrequency: "",
  });
  const [selectuser, setSelectuser] = React.useState(0);
  const [memdet, setMemdet] = React.useState({});
  const [loandtails, setLoandtails] = React.useState({});
  const [paymentmethod, setPaymentmethod] = React.useState("cash");

  React.useEffect(() => {
    fetch(BaseURL + "admin/allloanuser", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) setUserlist(res.list);
        else alert(res.error);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (selectuser) {
      setMemdet(userlist.find((dt) => dt._id == selectuser));
    }
  }, [selectuser]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    // checks
    if (formdata.loanproduct == "") {
      alert("Please select loan product");
      return;
    }
    if (formdata.loanamount == "") {
      alert("Please enter loan amount");
      return;
    }
    if (formdata.loanterm == "") {
      alert("Please enter loan term");
      return;
    }
    if (formdata.repaymentfrequency == "") {
      alert("Please enter repayment frequency");
      return;
    }
    // if (selectuser == 0) {
    //   alert("Please select member");
    //   return;
    // }

    const snd = {
      interest: formdata.loanproduct,
      amount: formdata.loanamount,
      term: formdata.loanterm,
      repaymentterm: formdata.repaymentfrequency,
    };

    fetch(BaseURL + "admin/addloan/" + memdet._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(snd),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setLoandtails(res.loan);
          setPagefil(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const setpayment = async (e) => {
    e.preventDefault();

    const snd = {
      paymentmethod: paymentmethod,
    };

    const res = await fetch(BaseURL + "admin/addpayment/" + loandtails._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(snd),
    });
    const resdata = await res.json();
    console.log(resdata);
    if (resdata.error) {
      alert(resdata.responseMessage);
      return;
    }
    alert("Loan created successfully");
    navigate("/loanmanagement");
  };

  const handlemem = (e) => {
    e.preventDefault();
    if (selectuser) setSelmem(true);
    else alert("Please select member");
  };

  return (
    <div className="createloan row mt-3 pad90">
      {!page1fil && (
        <div className="col-lg-6">
          <form>
            <h5>Member Details</h5>
            <div className="d-flex flex-column">
              <label className="mt-3">Member ID</label>
              <select
                onChange={(e) => setSelectuser(e.target.value)}
                className="p-2 mb-3"
                disabled={selmem}
              >
                <option selected disabled hidden>
                  Search member ID
                </option>
                {userlist.map((dt, idx) =>
                  dt._id ? (
                    <option key={idx} value={dt._id}>
                      {dt._id} - {dt.name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div className="d-flex my-2 justify-content-between">
              <div className="d-flex flex-column">
                <label className="mt-3">Member Name</label>
                <input
                  type="text"
                  // placeholder="David"
                  value={memdet?.name}
                  disabled
                />
              </div>
              <div className="d-flex flex-column">
                <label className="mt-3">Date of Birth</label>
                <input
                  type="text"
                  value={
                    memdet?.dob
                    // .split("T")[0]
                    // .split("-")
                    // .reverse()
                    // .join("-")
                  }
                  disabled
                />
              </div>
            </div>
            <div className="d-flex my-4">
              <button
                onClick={handlemem}
                className="ms-auto btn btn-sm btn-dark"
                disabled={selmem}
              >
                Continue
              </button>
            </div>
            <h5 className="m">Create Loan</h5>
            <div className="d-flex flex-column">
              <label className="mt-3">Select Loan Product</label>
              <select
                className="py-2 px-2 mb-3"
                name="loanproduct"
                onChange={handlechange}
                disabled={!selmem}
              >
                <option selected disabled hidden>
                  Simple Interest or Reducing Method
                </option>
                <option value="Simple Interest">Simple Interest</option>
                <option value="Compound Interest">Reducing Method</option>
              </select>
            </div>
            <div className="d-flex my-2 justify-content-between">
              <div className="d-flex flex-column">
                <label className="mt-3">Loan Amount</label>
                <input
                  type="text"
                  placeholder="$000"
                  name="loanamount"
                  value={formdata.loanamount}
                  onChange={handlechange}
                  disabled={!selmem}
                />
              </div>
              {/* <div className="d-flex flex-column">
                <label className="mt-3">Interest type</label>
                <input
                  type="text"
                  placeholder="Simple / Compound"
                  name="interesttype"
                  value={formdata.interesttype}
                  onChange={handlechange}
                  disabled={!selmem}
                />
              </div> */}
            </div>
            <div className="d-flex my-2 mb-5 justify-content-between">
              <div className="d-flex flex-column">
                <label className="mt-3">Loan Term</label>
                <input
                  type="text"
                  placeholder="6 Months"
                  name="loanterm"
                  value={formdata.loanterm}
                  onChange={handlechange}
                  disabled={!selmem}
                />
              </div>
              <div className="d-flex flex-column">
                <label className="mt-3">Repayment Frequency</label>
                <input
                  type="text"
                  placeholder="1 Month"
                  name="repaymentfrequency"
                  value={formdata.repaymentfrequency}
                  onChange={handlechange}
                  disabled={!selmem}
                />
              </div>
            </div>
            <div className="d-flex my-4">
              <button
                onClick={handlesubmit}
                className="ms-auto btn btn-sm btn-dark"
                disabled={!selmem}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
      {page1fil && (
        <div className="col-lg-6">
          <h5>Payment Methods</h5>
          <div className="d-flex flex-column">
            <div className="my-3">
              <input
                type="radio"
                name="payment"
                id="cash"
                onChange={(e) => setPaymentmethod(e.target.id)}
                defaultChecked
              />
              <label className="" htmlFor="cash">
                Cash in hand
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="payment"
                onChange={(e) => setPaymentmethod(e.target.id)}
                id="banktransfer"
              />
              <label className="" htmlFor="banktransfer">
                Bank Transfer
              </label>
            </div>
            <div className="my-3">
              <input
                type="radio"
                name="payment"
                id="other"
                onChange={(e) => setPaymentmethod(e.target.id)}
              />
              <label className="" htmlFor="other">
                Any other option
              </label>
            </div>
          </div>
          <div className="d-flex my-4">
            <button
              onClick={setpayment}
              className="ms-auto btn btn-sm btn-dark"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
