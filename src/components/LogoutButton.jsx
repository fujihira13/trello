import React, { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.error("ログアウトエラー:", err);
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#ffffff",
        color: "#333333",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;
