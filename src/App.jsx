import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound"; 
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/todo-list"
            element={<PrivateRoute element={<Todo />} />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
