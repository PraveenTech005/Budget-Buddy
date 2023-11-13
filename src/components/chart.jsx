import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";
import axios from "axios";

const Linechart = ({userId}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user || !user.history) {
    return <p>Loading user data...</p>;
  }

  const data = user.history;

  return (
    <div className="cont-main chart">
      <ResponsiveContainer width="95%" height="95%">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 10
          }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#f00" />
          <Line type="monotone" dataKey="balance" stroke="#00f" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Linechart;
