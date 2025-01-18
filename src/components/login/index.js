import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Loginpage = () => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repasswordValue, setRePassowrd] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false)
  const [emailIdCorrect, setEmailCorrectID] = useState(false)
  const [sign, setSign] = useState(true);
  const navigate = useNavigate();
  const nameChange = (e) => {
    setNameValue(e.target.value);
  };

  const emailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const passwordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const rePasswordChange = (e) => {
    setRePassowrd(e.target.value);
  };

  const signUpButton = async () => {
    const payload = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    try {
      const response = await fetch("https://invoice-managment-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        navigate("/form");
      } else {
        window.alert("there is a error in submiting");
      }
    } catch (e) {
      console.log(e, "error in to sending frontend");
    }
  };

  const signInButton = async () => {
    const payload = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const response = await fetch("https://invoice-managment-backend.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status === 200) {
        navigate('/form')
        console.log(response.json());
      } else if (response.status === 404) {
        setEmailCorrectID(true)
        console.log("please enter valid email id");
      } else if (response.status === 400) {
        setPasswordCorrect(true)
        console.log("please enter password valid");
      }
    } catch (e) {
      console.log(e, "error in tyr error methon");
    }
  };

  const changeSignIn = () => {
    setSign(!sign);
  };
  return (
    <>
      <div className="total-main-page-container">
        <div className="login-main-page">
          {sign && (
            <div className="input-container">
              <label className="placeholder">Name</label>
              <input type="text" onChange={nameChange} value={nameValue} className="input"/>
            </div>
          )}

          <div className="input-container">
            <label className="placeholder">Email</label>
            <input type="email" onChange={emailChange} value={emailValue} className="input"/>
            <div className="incorrect-password">{emailIdCorrect && 'Enter valid Email'}</div>
          </div>
          
          <div className="input-container">
            <label className="placeholder">Password</label>
            <input
              type="password"
              onChange={passwordChange}
              value={passwordValue}
              className="input"
            />
            <div className="incorrect-password">{passwordCorrect && 'Incorrect Passowrd'}</div>
          </div>
          {sign && (
            <div className="input-container">
              <label className="placeholder">Re- enter Password</label>
              <input
                type="text"
                onChange={rePasswordChange}
                value={repasswordValue}
                className="input"
              />
            </div>
          )}
          <div>
            {sign ? (
              <button className="submit-button" onClick={signUpButton}>Submit</button>
            ) : (
              <button className="submit-button" onClick={signInButton}>Submit</button>
            )}
          </div>
          <div>
            <button className="signIN-button" onClick={changeSignIn}>
              {sign ? "Sign IN" : "Sign UP"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
