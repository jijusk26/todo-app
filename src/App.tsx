import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashPage from "./pages/splash-page";
import LoginPage from "./pages/login-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
