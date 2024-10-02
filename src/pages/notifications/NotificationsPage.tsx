import { useEffect, useState } from "react";
import { Container, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Menu from "@components/menu/Menu";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import ControlsNotification from "@components/controlsNotifications/ControlsNotification";
import CustomPagination from "@components/pagination/CustomPagination";
import "./NotificationsPage.scss";

const mockData = [
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    type: "notification",
    text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "Мария",
    last_name: "Иванова",
    status: 0,
    email: "example@gmail.com",
    type: "canceled",
    text: "Ученик отменил урок",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 1,
    email: "example@gmail.com",
    type: "notification",
    text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    type: "notification",
    text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "Мария",
    last_name: "Иванова",
    status: 1,
    email: "example@gmail.com",
    type: "canceled",
    text: "Ученик отменил урок",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 1,
    email: "example@gmail.com",
    type: "notification",
    text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    type: "canceled",
    text: "Ученик отменил урок",
  },
  {
    id: "00349",
    date: "2024-03-20 17:45",
    first_name: "Мария",
    last_name: "Иванова",
    status: 0,
    email: "example@gmail.com",
    type: "notification",
    text: "Напоминаем, что через 1 час у вас запланировано занятие с преподавателем Jeff Morison.",
  },
];

const NotificationsPage = () => {
  const { t } = translate("translate", { keyPrefix: "notificationsPage" });

  const { page } = useParams();

  const [notificationPerPage] = useState(8);
  const [notifications, setNotifications] = useState(mockData.slice(0, notificationPerPage));
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearch = (word: string) => {
    setSearchWord(word);
  };

  const headColumns = [t("date"), t("time"), "ID", t("firstLastName"), t("status"), "E-mail", t("notification"), ""];

  useEffect(() => {
    if (searchWord === "") {
      setNotifications(mockData.slice(0, notificationPerPage));
    } else {
      const filteredData = mockData.filter((el) => el.email.toLowerCase().includes(searchWord.toLowerCase()));
      setNotifications(filteredData.slice(0, notificationPerPage));
    }
    // eslint-disable-next-line
  }, [searchWord]);

  return (
    <Container className="notificationsPageContainer">
      <Menu />
      <Box className="contentNotificationsPage">
        <ControlsNotification searchWord={searchWord} cbHandleChangeSearch={handleChangeSearch} />
        <Table className="notificationsTable">
          <TableHead className="notificationsTableHead">
            <TableRow>
              {headColumns.map((el, ind) => (
                <TableCell key={ind}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.length !== 0 ? (
              notifications.map((el, ind) => <p>{el.date}</p>)
            ) : (
              <TableRow className="emptyRowUsers">
                <TableCell colSpan={headColumns.length}>
                  <p>{t("emptyNotifications")}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          count={mockData.length}
          itemsPerPage={notificationPerPage}
          urlPage={`/notifications`}
          activePage={page as string}
          nameBtnBack={t("back")}
          nameBtnNext={t("next")}
        />
      </Box>
    </Container>
  );
};

export default NotificationsPage;
