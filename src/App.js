import Headers from "./componets/header/Headers";
import TaskCards from "./componets/task/TaskCards";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TestApi from "./componets/TestApi";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <div className="app">
        {user && <Headers />}
        <Routes>
          <Route path="/" element={user ? <TaskCards /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/test" element={<TestApi />} /> {/* 追加 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
