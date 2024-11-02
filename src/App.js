import Headers from "./componets/header/Headers";
import TaskCards from "./componets/task/TaskCards";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestApi from "./componets/TestApi";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Headers />
                <TaskCards />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestApi />} /> {/* 追加 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
