const router = require("express").Router();
const User = require("../models/User");

// 接続テスト用のエンドポイントを追加
router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth router is working" });
});

//ユーザー登録
router.post("/register", async (req, res) => {
  console.log("新規ユーザー登録リクエスト受信:", {
    userName: req.body.userName,
    email: req.body.email,
  });

  try {
    // メールアドレスの重複チェック
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("既存のメールアドレス:", req.body.email);
      return res.status(400).json({
        message: "このメールアドレスは既に登録されています",
      });
    }
    // ユーザー名の重複チェック
    const existingUserName = await User.findOne({
      userName: req.body.userName,
    });
    if (existingUserName) {
      console.log("既存のユーザー名:", req.body.userName);
      return res.status(400).json({
        message: "このユーザー名は既に使用されています",
      });
    }
    // 新規ユーザーの作成
    const newUser = await new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    // ユーザーの保存
    const savedUser = await newUser.save();
    console.log("新規ユーザー登録成功:", {
      id: savedUser._id,
      userName: savedUser.userName,
    });
    // パスワードを除外してユーザー情報を返す
    const { password, ...userWithoutPassword } = savedUser._doc;
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error("ユーザー登録エラー:", err);
    return res.status(500).json({
      message: "ユーザー登録に失敗しました",
      error: err.message,
    });
  }
});

//ログイン
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("ユーザーが見つかりません");
    const vaildPassword = req.body.password === user.password;
    if (!vaildPassword) return res.status(400).json("パスワードが違います");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: "ログインに失敗しました",
      error: err.message,
    });
  }
});

// router.get("/", (req, res) => {
//   res.send("auth router");
// });

module.exports = router;
