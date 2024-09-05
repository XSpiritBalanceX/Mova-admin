import { Container } from "@mui/material";
import logo from "@assets/logo.svg";
import SignIn from "@components/signIn/SignIn";
import "./AuthPage.scss";

const AuthPage = () => {
  return (
    <Container className="authPageContainer">
      <img src={logo} alt="logo" />
      <SignIn />
    </Container>
  );
};

export default AuthPage;
