import axios from "axios";
import React, { useEffect, useState } from "react";
import "./history.css";

const History = ({ userId }) => {
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

  const handleDelete = async (itemId) => {
    try {
      const updatedHistory = user.history.filter((item) => item.id !== itemId);

      const updatedUser = { ...user, history: updatedHistory };

      await axios.put(`http://localhost:8000/users/${userId}`, updatedUser);

      setUser(updatedUser);
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  }

  if (!user || !user.history) {
    return <p>Loading user data...</p>;
  }

  const data = user.history;
  return (
    <div className="history">
      <h2>History</h2>
      {user && user.history && user.history.length > 0 ? (
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
                  {item.income !== 0? <div className="li li-income">+{item.income}</div>: <div className="li li-expense">-{item.expense}</div>}
                </div>
              </div>
              <div className="menu" onClick={() => handleDelete(item.id)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
              </div>
            </div>
          </li>
        ))}
      </div>
      ) : (<p>- X - No transactions available. - X -</p>)}
    
    </div>
);
};

export default History;
