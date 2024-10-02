import { Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import moment from "moment";
import "./NotificationsPage.scss";

const mockData = {
  id: "00349",
  date: "2024-03-20 17:45",
  first_name: "Мария",
  last_name: "Иванова",
  status: 0,
  email: "example@gmail.com",
  type: "notification",
  text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
};

const NotificationItemPage = () => {
  const { t } = translate("translate", { keyPrefix: "notificationsPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/notifications/1");
  };

  const dateTimeFields = [
    { label: "date", data: moment(mockData.date, "YYYY-MM-DD HH:mm").format("DD.MM.YYYY") },
    { label: "time", data: moment(mockData.date, "YYYY-MM-DD HH:mm").format("HH:mm") },
  ];

  const notificationsDataFields = [
    { label: t("firstLastName"), data: `${mockData.first_name} ${mockData.last_name}` },
    { label: "ID", data: mockData.id },
    { label: t("status"), data: mockData.status === 0 ? t("student") : t("teacher") },
    { label: "E-mail", data: mockData.email },
    {
      label: t("typeNotification"),
      data:
        mockData.type === "notification"
          ? t("notificationLesson")
          : mockData.type === "canceled"
          ? t("canceledLesson")
          : "",
    },
  ];

  return (
    <Container className="notificationItemPageContainer">
      <Menu />
      <Box className="contentNotificationItem">
        <Box className="navigationButtonBox">
          <Button type="button" onClick={handleNavigate}>
            <ArrowBackIosNewIcon />
            {t("notification")}
          </Button>
        </Box>
        <Box className="notificationInfoBox">
          {dateTimeFields.map((el, ind) => (
            <Box key={ind} className="itemInfoNotification">
              <p className="labelText">{t(el.label)}</p>
              <p className="dataText">{el.data}</p>
            </Box>
          ))}
        </Box>
        <Box className="notificationInfoBox">
          {notificationsDataFields.map((el, ind) => (
            <Box key={ind} className="itemInfoNotification">
              <p className="labelText">{el.label}</p>
              <p className="dataText">{el.data}</p>
            </Box>
          ))}
        </Box>
        <Box className="textNotificationBox">
          <p className="labelTextNotification">{t("textNotification")}</p>
          <Box className="dataTextNotificationBox">{mockData.text}</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NotificationItemPage;
