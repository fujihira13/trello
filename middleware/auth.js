const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("トークンが見つかりません");
      return res.status(401).json({ message: "認証が必要です" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      console.log("トークン検証エラー:", err);
      return res.status(401).json({ message: "無効なトークンです" });
    }
  } catch (err) {
    console.error("認証エラー:", err);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
};

module.exports = auth;
