import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ControlledSearch from "@components/fields/ControlledSearch";
import "./ControlsUsers.scss";

interface IControlsUsersProps {
  searchWord: string;
  cbHandleChangeSearch: (word: string) => void;
}

const ControlsUsers = ({ searchWord, cbHandleChangeSearch }: IControlsUsersProps) => {
  const { t } = translate("translate", { keyPrefix: "usersPage" });

  const { type } = useParams();
  const navigate = useNavigate();

  const typeButtons = ["all", "students", "teachers", "archive"];

  const handleChangeType = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/users/${e.currentTarget.name}/1`);
  };

  const handleCreateAdmin = () => {
    navigate("/create_admin");
  };

  return (
    <Box className="controlsUsersBox">
      <Box className="typesBox">
        <Box>
          {typeButtons.map((el, ind) => (
            <Button
              key={ind}
              type="button"
              name={el}
              onClick={handleChangeType}
              className={`typeButton ${type === el ? "activeButton" : ""}`}
            >
              {t(el)}
            </Button>
          ))}
        </Box>
        <Button type="button" onClick={handleCreateAdmin} className="createAdminButton">
          <AddIcon /> {t("createAdmin")}
        </Button>
      </Box>
      <ControlledSearch
        placeholder={t("searchUsers")}
        searchWord={searchWord}
        cbHandleChangeSearch={cbHandleChangeSearch}
      />
    </Box>
  );
};

export default ControlsUsers;
