import { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import LogoImage from "../assets/todo-logo.png";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/auth";
import { HttpStatus } from "../helpers/http-helpers";

const LoginPage = () => {
  const [loginCreds, setLoginCreds] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickLogin = async () => {
    const isUserNameValid = await validateUsername();
    const isPasswordValid = await validatePassword();

    if (isPasswordValid && isUserNameValid) {
      const response = await loginUser({
        username: loginCreds.username,
        password: loginCreds.password,
      });

      if (response.status === HttpStatus.SUCCESS && response.data) {
        console.log("the token", response.data.accessToken);
        await localStorage.setItem("TOKEN", response.data.accessToken);
        navigate("/dashboard");
      }
    }
  };

  const validateUsername = async (): Promise<boolean> => {
    if (loginCreds.username && loginCreds.username.trim() !== "") {
      setUserNameError(false);
      return true;
    }
    setUserNameError(true);
    return false;
  };

  const validatePassword = async (): Promise<boolean> => {
    if (loginCreds.password && loginCreds.password.trim() !== "") {
      setPasswordError(false);
      return true;
    }
    setPasswordError(true);
    return false;
  };

  return (
    <Row
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={LogoImage} style={{ height: "50%" }} />
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <div
          style={{
            width: "60%",
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
            borderColor: "red",
            borderWidth: 1,
          }}
        >
          <p
            style={{
              marginTop: 20,
              color: "#000",
              fontSize: 24,
              fontWeight: "800",
            }}
          >
            Login To Continue
          </p>
          <p style={{ marginTop: 20, color: "#000" }}>Username</p>
          <Input
            value={loginCreds.username}
            onChange={(text: any) => {
              const clonedCreds = { ...loginCreds };
              clonedCreds.username = text.target.value;
              setLoginCreds(clonedCreds);
            }}
            style={{
              borderBottomColor: userNameError ? "red" : "#d3d3d3",
              borderBottomWidth: userNameError ? 2 : 1,
              marginBottom: 8,
              height: 40,
            }}
            onBlur={validateUsername}
          />
          <p style={{ marginTop: 20, color: "#000" }}>Password</p>
          <Input
            value={loginCreds.password}
            onChange={(text: any) => {
              const clonedCreds = { ...loginCreds };
              clonedCreds.password = text.target.value;
              setLoginCreds(clonedCreds);
            }}
            type="password"
            style={{
              borderBottomColor: passwordError ? "red" : "#d3d3d3",
              borderBottomWidth: passwordError ? 2 : 1,
              marginBottom: 30,
              height: 40,
            }}
            onBlur={validatePassword}
          />
          <Button
            onClick={onClickLogin}
            style={{
              backgroundColor: "#008744",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ color: "#fff" }}>
              <LoginOutlined /> Login
            </p>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
