import './App.css'
import Form from './components/Form.jsx'
import SurveyPage from './pages/SurveyPage.jsx'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/survey" replace />}/>
        <Route exact path="/survey" element={<SurveyPage/>} />
        <Route exact path="/admin" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
