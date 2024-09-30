import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { TItemHistory } from "./SettingUserSubscription";
import moment from "moment";
import "./SettingUserSubscription.scss";

interface IUserPaymentHistoryProps {
  userHistory: TItemHistory[];
  isShowAllHistory: boolean;
  cbHandleShowCollapseAllHistory: () => void;
}

const UserPaymentHistory = ({
  userHistory,
  isShowAllHistory,
  cbHandleShowCollapseAllHistory,
}: IUserPaymentHistoryProps) => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const handleShowAllHistory = () => {
    cbHandleShowCollapseAllHistory();
  };

  return (
    <Box className="historyOfPaymentBox">
      <Box className="historyTitleControl">
        <p>{t("historyOfPayment")}</p>
        <Button type="button" onClick={handleShowAllHistory}>
          {isShowAllHistory ? t("collapse") : t("showAll")}
        </Button>
      </Box>
      <Box className="historyUserBox">
        {userHistory.map((el, ind) => (
          <Box key={ind} className="itemHistory">
            <p className="dateCardText">{`${moment(el.date, "YYYY-MM-DD HH:mm").format("DD.MM.YYYY HH:mm")} ${
              el.card
            }`}</p>
            <p className="sumGoalText">{`${el.sum} ${el.goal}`}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserPaymentHistory;
