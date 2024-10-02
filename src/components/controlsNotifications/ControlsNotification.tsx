import { Box, TextField, InputAdornment } from "@mui/material";
import { translate } from "@i18n";
import SearchIcon from "@mui/icons-material/Search";
import "./ControlsNotification.scss";

interface IControlsNotificationProps {
  searchWord: string;
  cbHandleChangeSearch: (word: string) => void;
}

const ControlsNotification = ({ searchWord, cbHandleChangeSearch }: IControlsNotificationProps) => {
  const { t } = translate("translate", { keyPrefix: "notificationsPage" });

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    cbHandleChangeSearch(e.currentTarget.value);
  };

  return (
    <Box className="controlsNotificationBox">
      <TextField
        placeholder={t("searchUser")}
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
  );
};

export default ControlsNotification;
