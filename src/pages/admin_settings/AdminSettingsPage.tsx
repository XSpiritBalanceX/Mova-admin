import { Container, Box } from "@mui/material";
import Menu from "@components/menu/Menu";
import { useLocation } from "react-router-dom";
import AdminInformation from "@components/adminSettingsModules/AdminInformation";
import ChangeAdminProfile from "@components/adminSettingsModules/ChangeAdminProfile";
import ChangeAdminPassword from "@components/adminSettingsModules/ChangeAdminPassword";
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
    "/settings/admin": <ChangeAdminProfile />,
    "/settings/password": <ChangeAdminPassword />,
  };

  return (
    <Container className="settingsPageContainer">
      <Menu />
      <Box className="contentSettingsPage">{adminSettingsModules[pathname as keyof IAdminModules]}</Box>
    </Container>
  );
};

export default AdminSettingsPage;
