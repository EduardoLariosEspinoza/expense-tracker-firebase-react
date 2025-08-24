import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import ExpenseTracker from "./pages/expense-tracker";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
