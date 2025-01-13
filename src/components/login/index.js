import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repasswordValue, setRePassowrd] = useState("");
  const [sign, setSign] = useState(true);
  const navigate = useNavigate()
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
      const response = await fetch("http://localhost:5500/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json()
        navigate('/form')
      } else {
        window.alert("there is a error in submiting");
      }
    } catch (e) {
      console.log(e, "error in to sending frontend");
    }
  };

  const signInButton = () => {};

  const changeSignIn = () => {
    setSign(!sign);
  };
  return (
    <>
      <div>
        {sign && (
          <div>
            <label>Name</label>
            <input type="text" onChange={nameChange} value={nameValue} />
          </div>
        )}

        <div>
          <label>Email</label>
          <input type="email" onChange={emailChange} value={emailValue} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={passwordChange}
            value={passwordValue}
          />
        </div>
        {sign && (
          <div>
            <label>Re- enter Password</label>
            <input
              type="text"
              onChange={rePasswordChange}
              value={repasswordValue}
            />
          </div>
        )}
        <div>
          {sign ? (
            <button onClick={signUpButton}>Submit</button>
          ) : (
            <button onClick={signInButton}>Submit</button>
          )}
        </div>
        <div>
          <button onClick={changeSignIn}>{sign ? "Sign IN" : "Sign UP"}</button>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
