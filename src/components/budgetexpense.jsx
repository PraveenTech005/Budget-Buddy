import React, { useState, useEffect } from "react";
import axios from "axios";
import userimg from "../assets/userimg.jpg";
import "./dashboard.css";
import exitimg from "../assets/exit.png";
import { Link } from "react-router-dom";
import "./budget.css";
import Budget from "./budget";
import Expense from "./expense";

const Budgetexpense = ({ userId }) => {
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
              <h3>
                <Link to={`/${userId}/dashboard`}>DashBoard</Link>
              </h3>
              <h3>Budget & Expenses</h3>
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
          <div className="align-bud-exp">
            <div className="budget-expense">
              <div className="budexp budget">
                <h2>Budget</h2>
                <Budget userId={userId} />
              </div>
              <div className="budexp expense">
                <h2>Expenses</h2>
                <Expense userId={userId} />
              </div>
            </div>
            <div className="review-bud-exp">
              <div className="cont-bud-exp">
                <h3>Total Income</h3>
                <div className="cont-align">{user.income}</div>
              </div>
              <div className="cont-bud-exp">
                <h3>Total Expense</h3>
                <div className="cont-align">{user.expense}</div>
              </div>
              <div className="cont-bud-exp">
                <h3>Total Balance</h3>
                <div className="cont-align">{user.balance}</div>
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

export default Budgetexpense;
