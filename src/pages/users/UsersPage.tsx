import { useState } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import ControlsUsers from "@components/controlsUsers/ControlsUsers";
import "./UsersPage.scss";

const UsersPage = () => {
  const { t } = translate("translate", { keyPrefix: "usersPage" });

  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearch = (word: string) => {
    setSearchWord(word);
  };

  return (
    <Container className="usersPageContainer">
      <Menu />
      <Box className="contentUsersBox">
        <ControlsUsers searchWord={searchWord} cbHandleChangeSearch={handleChangeSearch} />
      </Box>
    </Container>
  );
};

export default UsersPage;
