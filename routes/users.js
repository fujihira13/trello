const router = require("express").Router();
const User = require("../models/User");

//ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("更新しました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントの時のみ更新可能です");
  }
});

//ユーザー情報の取得
router.get("/:id", async (req, res) => {
  console.log("ユーザー情報取得リクエスト:", {
    userId: req.params.id,
  });
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("ユーザーが見つかりません:", req.params.id);
      return res.status(404).json("ユーザーが見つかりません");
    }

    console.log("ユーザー情報取得成功:", {
      userId: user._id,
      userName: user.userName,
    });

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.error("ユーザー情報取得エラー:", err);
    return res.status(500).json({
      message: "ユーザー情報の取得に失敗しました",
      error: err.message,
    });
  }
});

//クエリでユーザー情報の取得
router.get("/", async (req, res) => {
  console.log("ユーザー情報取得リクエスト:", {
    userId: req.params.id,
  });
  const userId = req.query.userId;
  const userName = req.query.userName;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ userName: userName });

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.error("ユーザー情報取得エラー:", err);
    return res.status(500).json({
      message: "ユーザー情報の取得に失敗しました",
      error: err.message,
    });
  }
});

//ユーザーの削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("削除しました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分のアカウントの時のみ削除可能です");
  }
});

module.exports = router;
