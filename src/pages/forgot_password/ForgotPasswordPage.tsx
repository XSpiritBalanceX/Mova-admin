import { Container } from "@mui/material";
import logo from "@assets/logo.svg";
import { useLocation } from "react-router-dom";
import EmailForm from "@components/passwordRecovery/EmailForm";
import PasswordForm from "@components/passwordRecovery/PasswordForm";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const { pathname } = useLocation();

  return (
    <Container className="forgotPasswordPageContainer">
      <img src={logo} alt="logo" />
      {pathname === "/forgot_password/email" && <EmailForm />}
      {pathname === "/forgot_password/password" && <PasswordForm />}
    </Container>
  );
};

export default ForgotPasswordPage;
