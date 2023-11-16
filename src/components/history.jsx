import axios from "axios";
import React, { useEffect, useState } from "react";
import "./history.css";

const History = ({ userId }) => {
  const [user, setUser] = useState(null);

  const [userdata, setuserdata] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/history${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <p className="p">Loading user data...</p>;
  }

  const data = user;
  return (
    <div className="history">
      <h2>History</h2>
      {user && user.length > 0 ? (
        <div className="cont-hist">
          {data.map((item, index) => (
            <li key={index}>
              <div className="x-align">
                <div className="li-li-align">
                  <div className="li-align">
                    <div className="li reason">{item.reason}</div>
                    <div className="li date">{item.date}</div>
                  </div>
                  <div className="li-align">
                    <div className="li li-balance">{item.balance}</div>
                    {item.income !== 0 ? (
                      <div className="li li-income">+ ₹{item.income}</div>
                    ) : item.upi == null?(
                      <div className="li li-expense">- ₹{item.expense}</div>
                    ) : (
                      <div className="li li-upi"> - ₹{item.upi}</div>
                    ) }
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : (
        <p>- X - No transactions available. - X -</p>
      )}
    </div>
  );
};

export default History;
