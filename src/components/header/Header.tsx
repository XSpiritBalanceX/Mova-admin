import { Container, Button } from "@mui/material";
import logo from "@assets/logo.svg";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.scss";

const Header = () => {
  const handleLogOut = () => {
    console.log("log out");
  };

  return (
    <Container className="headerContainer">
      <NavLink to={"/users/all/1"}>
        <img src={logo} alt="logo" />
      </NavLink>
      <Button type="button" onClick={handleLogOut}>
        <LogoutIcon />
      </Button>
    </Container>
  );
};

export default Header;
