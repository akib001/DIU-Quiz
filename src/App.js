import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateQuiz from "./pages/CreateQuiz";
import AdminHeader from "./components/admin/AdminHeader";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route element={<AdminHeader/>}>
          <Route path="/create-quiz" element={<CreateQuiz/>} />
          <Route path="/dashboard" element={<AdminDashboard/>} />
        </Route>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}

export default App;
