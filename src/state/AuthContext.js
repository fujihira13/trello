import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

//最初のユーザー状態を定義
const initialState = {
  user: null,
  isFetching: true,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("未ログインまたはセッション期限切れ");
        } else {
          console.error("認証チェックエラー:", err);
        }
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkLoginStatus();
  }, []);

  if (state.isFetching) {
    return <div>読み込み中...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
