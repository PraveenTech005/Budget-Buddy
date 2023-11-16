import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Upi = ({ userId }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [upierrors, setupierrors] = useState({});
  const [upivalid, setupivalid] = useState(true);
  const [upidata, setupidata] = useState({
    reason: "",
    date: "",
    income: 0,
    expense: 0,
    balance: 0,
    upi: 0,
  });

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

  const handleUpiData = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (upidata.reason === "" || upidata.reason === null) {
      isvalid = false;
      validationerrors.reason = "UPI Reason Required";
    }
    if (upidata.upi === null || upidata.upi <= 0) {
      isvalid = false;
      validationerrors.upi = "UPI Demo Amount";
    }
    if (upidata.date === "" || upidata.date === null) {
      isvalid = false;
      validationerrors.date = "Expense Date Required";
    }

    setupierrors(validationerrors);
    setupivalid(isvalid);

    if (Object.keys(validationerrors).length === 0) {
      const updatedBalance = user.balance - upidata.upi;
      const updateUpi = user.upi + upidata.upi;
      axios
        .put(`http://localhost:8000/users/${userId}`, {
          ...user,
          balance: updatedBalance,
          upi:updateUpi,
          expense: user.expense + upidata.upi
        })
        .then(() => {
          const updatedExpdata = {
            ...upidata,
            balance: updatedBalance,
            income: 0,
            expense: user.expense + upidata.upi,
            upi: upidata.upi
          };
          setupidata(updatedExpdata);
          axios
            .post(`http://localhost:8000/history${userId}`, updatedExpdata)
            .then(() => {
              alert("Income Added Successfully");
              navigate(`/${userId}/dashboard`);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
      <div className="signuplogin">
        <div className="header">
          <div className="text">UPI Demo UI</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder={upivalid ? "Expense Ex.Food" : upierrors.reason}
              className={!upivalid ? "error" : ""}
              onChange={(event) =>
                setupidata({ ...upidata, reason: event.target.value })
              }
            />
          </div>
          <div className="input">
            <input
              type="number"
              placeholder={upivalid ? "Amount" : upierrors.upi}
              className={!upivalid ? "error" : "numb"}
              onBlur={(event) =>
                setupidata({
                  ...upidata,
                  upi: Number(event.target.value),
                })
              }
            />
          </div>
          <div className="input">
            <input
              type="date"
              className={!upivalid ? "error" : ""}
              onChange={(event) =>
                setupidata({ ...upidata, date: event.target.value })
              }
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit">
            <Link to={`/${userId}/dashboard`}>DashBoard</Link>
          </div>
          <div className="submit highlight" onClick={handleUpiData}>
            UPI Transaction
          </div>
        </div>
      </div>
  );
};

export default Upi;
