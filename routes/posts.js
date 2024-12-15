const router = require("express").Router();
const Post = require("../models/Post");

//投稿を作成する
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//投稿を更新する
router.put("/:id", async (req, res) => {
  try {
    console.log("更新リクエスト受信:", {
      postId: req.params.id,
      updateData: req.body,
    });

    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("投稿が見つかりません:", req.params.id);
      return res.status(404).json("投稿が見つかりません");
    }

    console.log("既存の投稿データ:", post);

    if (String(post.userId) === String(req.body.userId)) {
      const updateData = {};
      if (req.body.desc !== undefined) updateData.desc = req.body.desc;
      if (req.body.title !== undefined) updateData.title = req.body.title;

      console.log("更新データ:", updateData);

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateData,
        },
        { new: true }
      );

      console.log("更新後のデータ:", updatedPost);
      return res.status(200).json(updatedPost);
    } else {
      console.log("権限エラー:", {
        postUserId: post.userId,
        requestUserId: req.body.userId,
      });
      return res.status(403).json("他のユーザーの投稿は編集できません");
    }
  } catch (err) {
    console.error("更新エラーの詳細:", {
      error: err,
      stack: err.stack,
      postId: req.params.id,
      requestBody: req.body,
    });
    return res.status(500).json({
      message: "投稿の更新に失敗しました",
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

//投稿を削除する;
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("削除が完了しました");
    } else {
      return res.status(403).json("他の人の投稿を削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定の投稿を取得する;
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

// ユーザーの全投稿を取得する
router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
