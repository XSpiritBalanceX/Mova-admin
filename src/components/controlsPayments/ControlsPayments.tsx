import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import ControlledSearch from "@components/fields/ControlledSearch";
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
      <ControlledSearch
        placeholder={t("searchUser")}
        searchWord={searchWord}
        cbHandleChangeSearch={cbHandleChangeSearch}
      />
    </Box>
  );
};

export default ControlsPayments;
