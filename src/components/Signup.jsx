import name from "../assets/name.png";
import email from "../assets/email.png";
import pass from "../assets/password.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signuplogin.css";

const Signup = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const navigate = useNavigate();
  const [errors, seterrors] = useState({});
  const [valid, setvalid] = useState(true);
  const handleSignUp = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationerrors = {};
    if (data.name === "" || data.name === null) {
      isvalid = false;
      validationerrors.name = "User Name Required";
    }
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
    if (data.cpass === "" || data.cpass === null) {
      isvalid = false;
      validationerrors.cpass = "Password required";
    } else if (data.cpass !== data.pass) {
      isvalid = false;
      validationerrors.cpass = "Password Not Match";
    }
    seterrors(validationerrors);
    setvalid(isvalid);

    if (Object.keys(validationerrors).length === 0) {
      axios
        .post("http://localhost:8000/users", data)
        .then((result) => {navigate("/login");})
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signuplogin">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={name} alt="name" />
          <input
            type="text"
            placeholder={valid ? "User Name" : errors.name}
            className={!valid ? "error" : ""}
            onChange={(event) => setdata({ ...data, name: event.target.value })}
          />
          *
        </div>
        <div className="input">
          <img src={email} alt="email" />
          <input
            type="email"
            placeholder={valid ? "someone123@gmail.com" : errors.email}
            className={!valid ? "error" : ""}
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
            className={!valid ? "error" : ""}
            onChange={(event) => setdata({ ...data, pass: event.target.value })}
          />
          *
        </div>
        <div className="input">
          <img src={pass} alt="password" />
          <input
            type="password"
            placeholder={valid ? "Confirm Password" : errors.cpass}
            className={!valid ? "error" : ""}
            onChange={(event) =>
              setdata({ ...data, cpass: event.target.value })
            }
          />
          *
        </div>
      </div>
      <div className="submit-container">
        <div className="submit highlight" onClick={handleSignUp}>
          Sign Up
        </div>
        <div className="submit">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
