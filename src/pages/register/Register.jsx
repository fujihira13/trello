import React from "react";
import "./Register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //パスワードと確認用パスワードが一致しているか
    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity("パスワードが一致しません");
    } else {
      try {
        const user = {
          userName: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        // デバッグ用のログ
        console.log("送信するユーザー情報:", user);
        //registerApiを叩く
        const response = await axios.post("/api/auth/register", user);
        console.log("APIレスポンス:", response.data);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h3 className="loginlogo">Real SNS</h3>
          <span className="logonDesc">本格的なやつ</span>
        </div>
        <div className="loginright">
          <div className="loginbox">
            <p className="loginmsg">新規登録はこちら</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className="loginInput"
                placeholder="ユーザー名"
                required
                ref={username}
              />
              <input
                type="email"
                className="loginInput"
                placeholder="メールアドレス"
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
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード確認用"
                required
                minLength="6"
                ref={passwordConfirm}
              />
              <button className="loginButton" type="submit">
                新規登録
              </button>
              <button className="loginregisterbutton">ログイン</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
