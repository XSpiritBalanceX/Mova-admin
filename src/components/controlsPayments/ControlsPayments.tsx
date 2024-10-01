import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./ControlsPayments.scss";

interface IControlsPaymentsProps {
  searchWord: string;
  cbHandleChangeSearch: (word: string) => void;
}

const ControlsPayments = ({ searchWord, cbHandleChangeSearch }: IControlsPaymentsProps) => {
  const { t } = translate("translate", { keyPrefix: "paymentsPage" });

  const { type } = useParams();
  const navigate = useNavigate();

  const typeButtons = ["all", "students", "teachers"];

  const handleChangeType = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/payments/${e.currentTarget.name}/1`);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    cbHandleChangeSearch(e.currentTarget.value);
  };

  return (
    <Box className="controlsPaymentsBox">
      <Box className="typesBox">
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
      <Box className="searchFieldBox">
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
    </Box>
  );
};

export default ControlsPayments;
