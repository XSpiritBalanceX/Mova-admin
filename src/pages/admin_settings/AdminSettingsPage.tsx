import { Container, Box } from "@mui/material";
import Menu from "@components/menu/Menu";
import { useLocation } from "react-router-dom";
import AdminInformation from "@components/adminSettingsModules/AdminInformation";
import "./AdminSettingsPage.scss";

interface IAdminModules {
  "/settings": JSX.Element;
  "/settings/admin": JSX.Element;
  "/settings/password": JSX.Element;
}

const AdminSettingsPage = () => {
  const { pathname } = useLocation();

  const adminSettingsModules: IAdminModules = {
    "/settings": <AdminInformation />,
    "/settings/admin": <Box>change admin</Box>,
    "/settings/password": <Box>change password</Box>,
  };

  return (
    <Container className="settingsPageContainer">
      <Menu />
      <Box className="contentSettingsPage">{adminSettingsModules[pathname as keyof IAdminModules]}</Box>
    </Container>
  );
};

export default AdminSettingsPage;
