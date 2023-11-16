import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./budget.css";

const Budget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [newBalance, setNewBalance] = useState(0);

  const [inperrors, setinperrors] = useState({});
  const [inpvalid, setinpvalid] = useState(true);
  const [incdata, setincdata] = useState({
    reason: "",
    date: "",
    income: 0,
    expense: 0,
    balance: 0,
  });
  console.log(newBalance)

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

  const handleIncomeData = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (incdata.reason === "" || incdata.reason === null) {
      isvalid = false;
      validationerrors.reason = "Source Of Income Required";
    }
    if (incdata.income === null || incdata.income <= 0) {
      isvalid = false;
      validationerrors.income = "Income Amount Required";
    }
    if (incdata.date === "" || incdata.date === null) {
      isvalid = false;
      validationerrors.date = "Income Date Required";
    }

    setinperrors(validationerrors);
    setinpvalid(isvalid);

    if (Object.keys(validationerrors).length === 0) {
      const updatedBalance = user.balance + incdata.income;
      setNewBalance(updatedBalance);
      axios
        .put(`http://localhost:8000/users/${userId}`, {
          ...user,
          balance: updatedBalance,
          income: user.expense + updatedBalance
        })
        .then(() => {
            const updatedIncdata = { ...incdata, balance: updatedBalance, expense: user.expense };
            setincdata(updatedIncdata);
          axios
            .post(`http://localhost:8000/history${userId}`, updatedIncdata)
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
    <div>
      <div className="cont-main budget">
        <div className="input-dash">
          <input
            type="text"
            placeholder={
              inpvalid ? "Income Ex.Salary" : inperrors.reason
            }
            className={!inpvalid ? "error" : ""}
            onChange={(event) =>
              setincdata({ ...incdata, reason: event.target.value })
            }
          />
          <input
            type="number"
            placeholder={inpvalid ? "Amount" : inperrors.income}
            className={!inpvalid ? "error" : "numb"}
            onBlur={(event) =>
              setincdata({
                ...incdata,
                income: Number(event.target.value),
              })
            }
          />
          <input
            type="date"
            className={!inpvalid ? "error" : ""}
            onChange={(event) =>
              setincdata({ ...incdata, date: event.target.value })
            }
          />
        </div>
        <div className="addincome" onClick={handleIncomeData}>
          Add Income
        </div>
      </div>
    </div>
  );
};

export default Budget;
