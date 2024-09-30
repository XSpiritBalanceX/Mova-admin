import { useState } from "react";
import { Box } from "@mui/material";
import { translate } from "@i18n";
import moment from "moment";
import Balance from "./Balance";
import UserBankCards from "./UserBankCards";
import ModalNewBankCard from "@components/modal/ModalNewBankCard";
import "./SettingUserSubscription.scss";

const mockDataSubscription = {
  name: "Mova Premium",
  date_end: "2024-10-03",
  next_payment: "2024-11-03",
  card: "Visa ****6799",
  sum: "150 BYN",
};

const SettingUserSubscription = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const [isAddNewBankCard, setIsAddNewBankCard] = useState(false);
  const [isShowAllHistory, setIsShowAllHistory] = useState(false);

  const subscriptionInfoFields = [
    { label: "nextPay", date: moment(mockDataSubscription.next_payment, "YYYY-MM-DD").format("DD.MM.YYYY") },
    { label: "paymentMethod", date: mockDataSubscription.card },
    { label: "sum", date: mockDataSubscription.sum },
  ];

  const handleOpenModal = () => {
    setIsAddNewBankCard(true);
  };

  const handleCloseModal = () => {
    setIsAddNewBankCard(false);
  };

  return (
    <>
      <ModalNewBankCard isOpen={isAddNewBankCard} cbCloseModal={handleCloseModal} />
      <Box className="settingSubscriptionBox">
        <Box className="subscriptionBalanceBox">
          <Box className="subscriptionBox">
            <p className="subscriptionTitle">{t("subscription")}</p>
            <p className="subscriptionNameDate">
              {mockDataSubscription.name}
              <span>
                {t("activeTo", { date: moment(mockDataSubscription.date_end, "YYYY-MM-DD").format("D MMMM") })}
              </span>
            </p>
            <Box className="subscriptionFieldsBox">
              {subscriptionInfoFields.map((el, ind) => (
                <Box key={ind} className="itemSubscriptionInfo">
                  <p className="itemSubscriptionTitle">{t(el.label)}</p>{" "}
                  <p className="itemSubscriptionData">{el.date}</p>
                </Box>
              ))}
            </Box>
          </Box>
          <Balance />
        </Box>
        <UserBankCards cbHandleAddNewBankCard={handleOpenModal} />
      </Box>
    </>
  );
};

export default SettingUserSubscription;
