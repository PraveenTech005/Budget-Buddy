import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./budget.css";

const Expense = ({ userId }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [experrors, setexperrors] = useState({});
  const [expvalid, setexpvalid] = useState(true);
  const [expdata, setexpdata] = useState({
    reason: "",
    date: "",
    income: 0,
    expense: 0,
    balance: 0,
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

  const handleExpenseData = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (expdata.reason === "" || expdata.reason === null) {
      isvalid = false;
      validationerrors.reason = "Expense Reason Required";
    }
    if (expdata.expense === null || expdata.expense <= 0) {
      isvalid = false;
      validationerrors.expense = "Expense Amount Required";
    }
    if (expdata.date === "" || expdata.date === null) {
      isvalid = false;
      validationerrors.date = "Expense Date Required";
    }

    setexperrors(validationerrors);
    setexpvalid(isvalid);

    if (Object.keys(validationerrors).length === 0) {
      const updatedBalance = user.balance - expdata.expense;
      axios
        .put(`http://localhost:8000/users/${userId}`, {
          ...user,
          balance: updatedBalance,
          expense: user.expense + expdata.expense
        })
        .then(() => {
            const updatedExpdata = { ...expdata, balance: updatedBalance, income: 0 , expense: user.expense + expdata.expense};
            setexpdata(updatedExpdata);
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
    <div>
      <div className="cont-main budget">
        <div className="input-dash">
          <input
            type="text"
            placeholder={
              expvalid ? "Expense Ex.Rent" : experrors.reason
            }
            className={!expvalid ? "error" : ""}
            onChange={(event) =>
              setexpdata({ ...expdata, reason: event.target.value })
            }
          />
          <input
            type="number"
            placeholder={expvalid ? "Amount" : experrors.expense}
            className={!expvalid ? "error" : "numb"}
            onBlur={(event) =>
              setexpdata({
                ...expdata,
                expense: Number(event.target.value),
              })
            }
          />
          <input
            type="date"
            className={!expvalid ? "error" : ""}
            onChange={(event) =>
              setexpdata({ ...expdata, date: event.target.value })
            }
          />
        </div>
        <div className="addincome" onClick={handleExpenseData}>
          Add Expense
        </div>
      </div>
    </div>
  );
};

export default Expense;
