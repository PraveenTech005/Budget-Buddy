import React, { useState, useEffect } from "react";
import axios from "axios";
import userimg from "../assets/userimg.jpg";
import "./dashboard.css";
import exitimg from "../assets/exit.png";
import { Link } from "react-router-dom";

const Dashboard = ({ userId }) => {
  const [user, setUser] = useState(null);

  const [data, setdata] = useState({
    incometxt:'',
    incomeamt:'',
    incomedate:'',
    expensetxt:'',
    expenseamt:'',
    expensedate:'',
    balance:''
  })
  const [inperrors, setinperrors] = useState({});
  const [inpvalid, setinpvalid] = useState(true);
  const [experrors, setexperrors] = useState({});
  const [expvalid, setexpvalid] = useState(true);
  const handleIncomeData = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (data.incometxt === "" || data.incometxt === null) {
      isvalid = false;
      validationerrors.incometxt = "Source Of Income Required";
    }
    if (data.incomeamt === "" || data.amnt === null || data.amnt <= 1) {
      isvalid = false;
      validationerrors.incomeamt = "Income Amount Required";
    }
    if (data.incomedate === "" || data.incomedate === null ) {
      isvalid = false;
      validationerrors.incomedate = "Income Date Required";
    }
    
    setinperrors(validationerrors);
    setinpvalid(isvalid);
  }
  const handleExpenseData = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (data.expensetxt === "" || data.expensetxt === null) {
      isvalid = false;
      validationerrors.expensetxt = "Reason of Expense Required";
    }
    if (data.expenseamt === "" || data.amnt === null || data.amnt <= 1) {
      isvalid = false;
      validationerrors.expenseamt = "Expense Amount Required";
    }
    if (data.expensedate === "" || data.expensedate === null ) {
      isvalid = false;
      validationerrors.expensedate = "Expense Date Required";
    }
    
    setexperrors(validationerrors);
    setexpvalid(isvalid);
  }

  // const handleData = () => {
  //   axios
  //     .post(`https://localhost:8000/users/${userId}`, data)
  //     .catch((err) => console.log(err));
  // }

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
              <h3>Budget</h3>
              <h3>Expenses</h3>
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
              <div className="cont-main chart">Chart</div>
              <div className="cont-main budget">
                <h2>Income</h2>
                <div className="input-dash">
                  <input
                    type="text"
                    placeholder={inpvalid ? "Source Of Income Ex.Salary" : inperrors.incometxt}
                    className={!inpvalid ? "error" : ""}
                    onChange={(event) => setdata({ ...data, incometxt: event.target.value })}
                  />*
                  <input
                    type="number"
                    placeholder={inpvalid ? "Amount" : inperrors.incomeamt}
                    className={!inpvalid ? "error" : ""}
                    onChange={(event) => setdata({ ...data, incomeamt: event.target.value })}
                  />*
                  <input
                    type="date"
                    className={!inpvalid ? "error" : ""}exp
                    onChange={(event) => setdata({ ...data, incomedate: event.target.value })}
                  />*
                </div>
                <div className="addincome" onClick={handleIncomeData}>Add Income</div>
              </div>
            </div>
            <div className="cont-main-div">
              <div className="cont-main review">
                <div className="cont-review">
                  <h3>Income</h3>
                  {user.incomeamt}
                </div>
                <div className="cont-review"></div>
                <div className="cont-review"></div>
                <div className="cont-review"></div>
              </div>
              <div className="cont-main expense">
              <h2>Expense</h2>
                <div className="input-dash">
                  <input
                    type="text"
                    placeholder={expvalid ? "Reason (Ex.Rent)" : experrors.expensetxt}
                    className={!expvalid ? "error" : ""}
                    onChange={(event) => setdata({ ...data, expensetxt: event.target.value })}
                  />*
                  <input
                    type="number"
                    placeholder={expvalid ? "Amount" : experrors.expenseamt}
                    className={!expvalid ? "error" : ""}
                    onChange={(event) => setdata({ ...data, expenseamt: event.target.value })}
                  />*
                  <input
                    type="date"
                    className={!expvalid ? "error" : ""}
                    onChange={(event) => setdata({ ...data, expensedate: event.target.value })}
                  />*
                </div>
                <div className="addincome" onClick={handleExpenseData}>Add Expense</div>
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
