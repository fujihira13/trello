import React from "react";
import "./Register.css";
export default function Register() {
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
            <input
              type="text"
              className="loginInput"
              placeholder="ユーザー名"
            />
            <input
              type="text"
              className="loginInput"
              placeholder="メールアドレス"
            />
            <input
              type="text"
              className="loginInput"
              placeholder="パスワード"
            />
            <input
              type="text"
              className="loginInput"
              placeholder="パスワード確認用"
            />
            <button className="loginButton">ログイン</button>
            <button className="loginregisterbutton">新規登録</button>
          </div>
        </div>
      </div>
    </div>
  );
}
