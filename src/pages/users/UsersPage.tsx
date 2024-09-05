import { Container } from "@mui/material";
import { translate } from "@i18n";

const UsersPage = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  return <Container className="usersPageContainer">UsersPage</Container>;
};

export default UsersPage;
