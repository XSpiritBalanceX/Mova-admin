import { Container } from "@mui/material";
import logo from "@assets/logo.svg";
import "./AuthPage.scss";

const AuthPage = () => {
  return (
    <Container className="authPageContainer">
      <img src={logo} alt="logo" />
    </Container>
  );
};

export default AuthPage;
