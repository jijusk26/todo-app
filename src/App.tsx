import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashPage from "./pages/splash-page";
import LoginPage from "./pages/login-page";
import { PostsPage } from "./pages/posts-page/post-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
