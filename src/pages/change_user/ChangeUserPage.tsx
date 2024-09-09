import { Box, Container } from "@mui/material";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import { useParams } from "react-router-dom";
import ChangeUserMenu from "./ChangeUserMenu";
import "./ChangeUserPage.scss";

const ChangeUserPage = () => {
  const { t } = translate("translate", { keyPrefix: "changeUserPage" });

  const { user_id, type } = useParams();

  return (
    <Container className="containerChangeUser">
      <Menu />
      <Box className="contentChangeUser">
        <ChangeUserMenu />
      </Box>
    </Container>
  );
};

export default ChangeUserPage;
