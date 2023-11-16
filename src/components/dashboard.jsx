import React, { useState, useEffect } from "react";
import axios from "axios";
import userimg from "../assets/userimg.jpg";
import "./dashboard.css";
import exitimg from "../assets/exit.png";
import History from "./history";
import Linechart from "./chart";
import { Link } from "react-router-dom";

const Dashboard = ({ userId }) => {
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

  return (
    <div>
      {user ? (
        <div className="dashboard">
          <div className="set-tab">
            <div className="cont-set-tab profile">
              <img src={userimg} alt="User Profile" />
              <h4>{user.name}'s Dashboard</h4>
              <h4>{user.email}</h4>
            </div>
            <div className="cont-set-tab options">
              <h3>DashBoard</h3>
              <h3>
                <Link to={`/${userId}/budgetexpense`}>Budget & Expenses</Link>
              </h3>
              <h3>
                <Link to={`/${userId}/upidemo`}>UPI DEMO Interface</Link>
              </h3>
            </div>
            <div className="cont-set-tab signout">
              <Link to="/login">
                <img src={exitimg} alt="Sign Out" />
                <h4>Sign Out</h4>
              </Link>
            </div>
          </div>
          <div className="main">
            <div className="cont-main-div">
              <div className="cont-main chart cont-chart">
                <Linechart userId={userId} />
              </div>
              <div className="cont-main review">
                <div className="review-align">
                  <div className="cont-review income">
                    <h3>Total Income</h3>
                    <div className="align">{user.income}</div>
                  </div>
                  <div className="cont-review expense">
                    <h3>Total Expense</h3>
                    <div className="align">{user.expense}</div>
                  </div>
                </div>
                <div className="review-align">
                  <div className="cont-review balance">
                    <h3>Total Balance</h3>
                    <div className="align">{user.balance}</div>
                  </div>
                  <div className="cont-review upi">
                    <h3>UPI Transactions</h3>
                    <div className="align">{user.upi}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cont-main-div">
              <div className="cont-main cont-history">
                <History userId={userId} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
