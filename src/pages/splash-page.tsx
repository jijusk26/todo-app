import { Col } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import LogoImag from "../assets/todo-logo.png";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 1000);
  }, []);

  const init = async () => {
    const token = await localStorage.getItem("TOKEN");

    if (token) {
      let decoded = jwtDecode(token);
      console.log("the decoded token", decoded);
      if (!decoded || !decoded.exp) {
        return navigate("/login");
      }
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        navigate("dashboard");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Col
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <img src={LogoImag} style={{ width: "50%" }} />
    </Col>
  );
};

export default SplashPage;
