import React from "react";
import "./Login.css";
export default function Login() {
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
            <input type="text" className="loginInput" placeholder="e-mail" />
            <input
              type="text"
              className="loginInput"
              placeholder="パスワード"
            />
            <button className="loginButton">ログイン</button>
            <span className="loginforget">パスワードを忘れた方はこちら</span>
            <button className="loginregisterbutton">新規登録</button>
          </div>
        </div>
      </div>
    </div>
  );
}
