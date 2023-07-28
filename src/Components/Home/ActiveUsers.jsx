import React from "react";
import { Doughnut } from "react-chartjs-2";

const ActiveUsers = () => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: [5, 5],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4">
      <h5>Active Users</h5>
      <Doughnut data={data} />
    </div>
  );
};

export default ActiveUsers;
