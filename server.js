const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const cors = require("cors");
const PORT = 3001;
const mongoose = require("mongoose");
require("dotenv").config();

//追加
app.use(
  cors({
    origin: "http://localhost:3000", // Reactアプリのオリジン
    credentials: true,
  })
);

// リクエストのログを取るミドルウェア
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

//データベース接続
mongoose
  .connect(process.env.MOMGOURL)
  .then(() => {
    console.log("✔ MongoDBと接続しました");
    console.log("✔ データベース名:", mongoose.connection.name);
    console.log("✔ ホスト:", mongoose.connection.host);
  })
  .catch((err) => {
    console.error("❌ MongoDB接続エラー:", err);
    process.exit(1); // 接続エラー時はサーバーを終了
  });

// 接続状態の監視を追加
mongoose.connection.on("error", (err) => {
  console.error("MongoDB接続エラー:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDBとの接続が切断されました");
});

// ベース URLのテスト用エンドポイント
app.get("/", (req, res) => {
  res.json({ message: "API Server is running" });
});

//ミドルウェア
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

// その他のルートはReactアプリにリダイレクト
app.get("/", (req, res) => {
  res.send("hellow");
});

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error("エラー発生:", err);
  res.status(500).json({
    message: "サーバーエラーが発生しました",
    error: err.message,
  });
});

// 404ハンドリング
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ message: "ページが見つかりません" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`サーバーが起動しました - http://localhost:${PORT}`);
  console.log("利用可能なエンドポイント:");
  console.log("- POST /api/auth/register");
  console.log("- POST /api/auth/login");
  console.log("- GET /api/users/:id");
});

// const path = require("path");

// // Reactのビルドファイルを提供する
// app.use(express.static(path.join(__dirname, "build")));

// // APIルート
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });
