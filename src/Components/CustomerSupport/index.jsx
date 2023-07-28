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

  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const rendercommntable = () =>
    data.map((idx) => (
      <tr>
        <td>{idx}.</td>
        <td>Cheyenne Vaccaro</td>
        <td>22 Jan 23, 21:24</td>
        <td>Not Working</td>
        <td>abc@gmail.om</td>
        <td>
          <div className="btn btn-sm btn-blue">View Message</div>
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
                  <th>Date & Time</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th>Message</th>
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
