import axios from "axios";

axios.defaults.withCredentials = true; // すべてのリクエストでクッキーを含める

// レスポンスインターセプターの追加
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラー時の処理
      console.log("認証エラーが発生しました");
      // ログインページへリダイレクト
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
