import React from "react";
import "./Styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";

import BaseURL from "../../Api/BaseURL";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [investment, setInvestment] = React.useState([]);
  const [totalinvestment, setTotalInvestment] = React.useState(0);
  const [remaininginvestment, setRemainingInvestment] = React.useState(0);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    setRemainingInvestment(Math.floor(10000 + Math.random() * 90000));
    fetch(BaseURL + "admin/investment/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.error) {
          setInvestment(res.investments);
          setTotalInvestment(res.totalamount);
        } else alert(res.resposneMessage);
      })
      .catch((err) => console.log(err));
  }, []);

  const paynow = () => {
    navigate(`/investment/${id}/payment`, {
      state: { remaininginvestment },
    });
  };

  const doc = new jsPDF();

  const filldata = () => {
    const header = [
      "S. No.",
      "Date",
      "Time",
      "Transaction ID",
      "Amount",
      "Method",
      "Status",
    ];

    const data = [];
    const total = investment?.investment?.length;

    investment?.investment?.map((dta, idx) => {
      data.push([
        idx + 1,
        dta?.date.split("T")[0].split("-").reverse().join("-"),
        dta?.date.split("T")[1].split(".")[0],
        Math.floor(100000000 + Math.random() * 900000000),
        dta?.amount,
        dta?.savingProfit,
        "Paid",
      ]);
    });

    doc.text("Investment History", 14, 15);

    doc.autoTable({
      head: [header],
      body: data,
      margin: { top: 20 },
      styles: { fontSize: 10, valign: "middle", halign: "center" },
    });
  };

  const exportToPDF = () => {
    doc.deletePage(1);
    doc.addPage();
    if (doc.autoTable.previous) {
      doc.autoTable.previous.finalY = 30;
    }

    filldata();
    doc.save("loan.pdf");
  };

  const printpdf = () => {
    doc.deletePage(1);
    doc.addPage();
    if (doc.autoTable.previous) {
      doc.autoTable.previous.finalY = 30;
    }

    filldata();
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
  };

  // const exportToCSV = () => {
  //   const data = investment?.investment;
  //   const fileName = "investment";
  //   const exportType = "csv";

  //   exportFromJSON({ data, fileName, exportType });
  // };

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
            <i className="fa-solid fa-arrow-left"></i> {investment?.name}
          </Link>
        </div>
        <div className="">
          <div className="btn btn-sm btn-dark me-3" onClick={printpdf}>
            Print
          </div>
          <div className="btn btn-sm btn-dark me-3" onClick={exportToPDF}>
            Export
          </div>

          <div className="btn btn-sm btn-green">
            Total Deposit $ {totalinvestment}
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
              <tbody>
                <tr>
                  <td>0.</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td> -- </td>
                  <td>$ {remaininginvestment}</td>
                  <td>--</td>
                  <td className="">
                    <button onClick={paynow} className="btn btn-primary">
                      Pay Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
                {renderloanhistable()}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
