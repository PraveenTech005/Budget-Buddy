import email from '../assets/email.png';
import pass from '../assets/password.png';
import { Link, useNavigate } from 'react-router-dom';
import './signuplogin.css';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [data, setdata] = useState({
    email:'',
    pass:''
  })
  const navigate = useNavigate();

  const [errors, seterrors] = useState({});
  const [valid, setvalid] = useState(true);
  const handleLogin = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (data.email === "" || data.email === null) {
      isvalid = false;
      validationerrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      isvalid = false;
      validationerrors.email = "Email is not valid";
    }
    if (data.pass === "" || data.pass === null) {
      isvalid = false;
      validationerrors.pass = "Password required";
    } else if (data.pass.length < 6) {
      isvalid = false;
      validationerrors.pass = "Password Length < 6";
    }

    axios
    .get("http://localhost:8000/users", data)
    .then((result) => {
      // eslint-disable-next-line array-callback-return
      result.data.map(user => {
        if(user.email === data.email){
          if(user.pass === data.pass){
            alert("Login Successfull");
            navigate(`/${user.id}/dashboard`);
          }
          else{
            isvalid = false;
            validationerrors.pass = "Wrong Password"
          }
        }
        else if(data.email !== ""){
          isvalid = false;
          validationerrors.email = "Wrong Email"
        }
    })
    seterrors(validationerrors);
    setvalid(isvalid);
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="signuplogin">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email} alt="email" />
          <input
            type="email"
            placeholder={valid ? "someone123@gmail.com" : errors.email}
            className={!valid ? "error x" : "x"}
            onChange={(event) =>
              setdata({ ...data, email: event.target.value })
            }
          />
          *
        </div>
        <div className="input">
          <img src={pass} alt="password" />
          <input
            type="password"
            placeholder={valid ? "Password" : errors.pass}
            className={!valid ? "error y" : "y"}
            onChange={(event) => setdata({ ...data, pass: event.target.value })}
          />
          *
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="submit highlight" onClick={handleLogin}>Login</div>
      </div>
    </div>
  )
}

export default Login;