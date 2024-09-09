import { Container } from "@mui/material";
import logo from "@assets/logo.svg";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <Container className="headerContainer">
      <NavLink to={"/users/all/1"}>
        <img src={logo} alt="logo" />
      </NavLink>
    </Container>
  );
};

export default Header;
