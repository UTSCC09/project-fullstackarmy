import React from "react";
import Logo from "../Logo";
import "./LoginPage.css";
import bgImg from "../../media/LoginBG.jpg";

const LoginPage: React.FC = () => {
  return (
    <div className="loginPage" style={{ backgroundImage: `url(${bgImg})` }}>
      <Logo />
      LoginPage
    </div>
  );
};

export default LoginPage;
