import React from "react";
import "./Login.css";
import { useRef } from "react";
import { loginCall } from "../../ActionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useContext } from "react";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h3 className="loginlogo">Real SNS</h3>
          <span className="logonDesc">本格的なやつ</span>
        </div>
        <div className="loginright">
          <div className="loginbox">
            <p className="loginmsg">ログイン</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                className="loginInput"
                placeholder="e-mail"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                required
                minLength="6"
                ref={password}
              />
              <button className="loginButton">ログイン</button>
              <span className="loginforget">パスワードを忘れた方はこちら</span>
              <button className="loginregisterbutton">新規登録</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
