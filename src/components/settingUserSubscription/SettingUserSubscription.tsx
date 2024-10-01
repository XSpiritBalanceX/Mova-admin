import { useState } from "react";
import { Box } from "@mui/material";
import { translate } from "@i18n";
import moment from "moment";
import Balance from "./Balance";
import UserBankCards from "./UserBankCards";
import ModalNewBankCard from "@components/modal/ModalNewBankCard";
import UserPaymentHistory from "./UserPaymentHistory";
import "./SettingUserSubscription.scss";

const mockDataSubscription = {
  name: "Mova Premium",
  date_end: "2024-10-03",
  next_payment: "2024-11-03",
  card: "Visa ****6799",
  sum: "150 BYN",
};

const mockDataHistory = [
  {
    id: 1,
    date: "2024-05-10 17:13",
    card: "Mastercard 4201******6650",
    sum: "— 13,50",
    goal: "(Оплата) -Package 2 - to Traves Yoren",
  },
  {
    id: 2,
    date: "2024-05-13 11:35",
    card: "Mastercard 4201******6650",
    sum: "+ 11,50",
    goal: "(возврат средств на карту)",
  },
  {
    id: 3,
    date: "2024-05-12 11:20",
    card: "Mastercard 4201******6650",
    sum: "— 11,50",
    goal: "(Оплата)",
  },
  {
    id: 4,
    date: "2024-05-10 17:13",
    card: "Mastercard 4201******6650",
    sum: "— 13,50",
    goal: "(Оплата) -Package 2 - to Traves Yoren",
  },
  {
    id: 5,
    date: "2024-05-13 11:35",
    card: "Mastercard 4201******6650",
    sum: "+ 11,50",
    goal: "(возврат средств на карту)",
  },
  {
    id: 6,
    date: "2024-05-12 11:20",
    card: "Mastercard 4201******6650",
    sum: "— 11,50",
    goal: "(Оплата)",
  },
];

export type TItemHistory = {
  id: number;
  date: string;
  card: string;
  sum: string;
  goal: string;
};

const SettingUserSubscription = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const [isAddNewBankCard, setIsAddNewBankCard] = useState(false);
  const [isShowAllHistory, setIsShowAllHistory] = useState(false);
  const [historyOfPayment, setHistoryOfPayment] = useState(mockDataHistory.slice(0, 5));

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

  const handleShowCollapseAllHistory = () => {
    setIsShowAllHistory(!isShowAllHistory);
    if (!isShowAllHistory) {
      setHistoryOfPayment(mockDataHistory);
    } else {
      setHistoryOfPayment(mockDataHistory.slice(0, 5));
    }
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
        <UserPaymentHistory
          userHistory={historyOfPayment}
          isShowAllHistory={isShowAllHistory}
          cbHandleShowCollapseAllHistory={handleShowCollapseAllHistory}
        />
      </Box>
    </>
  );
};

export default SettingUserSubscription;
