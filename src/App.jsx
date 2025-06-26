import "./App.css";
import Form from "./components/Form.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/survey" replace />} />
        <Route exact path="/survey" element={<SurveyPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
