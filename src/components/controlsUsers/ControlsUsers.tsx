import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    cbHandleChangeSearch(e.currentTarget.value);
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
      <Box className="searchFieldBox">
        <TextField
          placeholder={t("searchUsers")}
          value={searchWord}
          onChange={handleChangeSearch}
          className="searchField"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ControlsUsers;
