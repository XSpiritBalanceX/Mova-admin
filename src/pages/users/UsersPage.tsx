import { Container } from "@mui/material";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import "./UsersPage.scss";

const UsersPage = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  return (
    <Container className="usersPageContainer">
      <Menu />
    </Container>
  );
};

export default UsersPage;
