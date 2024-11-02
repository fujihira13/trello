const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const PORT = 3001;
const mongoose = require("mongoose");
require("dotenv").config();

//データベース接続
mongoose
  .connect(process.env.MOMGOURL)
  .then(() => {
    console.log("接続成功");
  })
  .catch((err) => {
    console.log(err);
  });
//ミドルウェア
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

// その他のルートはReactアプリにリダイレクト
app.get("/", (req, res) => {
  res.send("hellow");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const path = require("path");

// // Reactのビルドファイルを提供する
// app.use(express.static(path.join(__dirname, "build")));

// // APIルート
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });
