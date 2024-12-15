import React from "react";
import LogoutButton from "../LogoutButton";

const Headers = () => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: "rgb(102, 94, 74)",
          height: "60px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>Trello</h1>
        <LogoutButton />
      </header>
    </div>
  );
};

export default Headers;
