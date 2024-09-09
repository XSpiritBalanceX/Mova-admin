import { useState, useEffect } from "react";
import { Container, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import ControlsUsers from "@components/controlsUsers/ControlsUsers";
import UserItem from "@components/userItem/UserItem";
import { useParams } from "react-router-dom";
import CustomPagination from "@components/pagination/CustomPagination";
import "./UsersPage.scss";

const mockData = [
  {
    id: 1349,
    name: "John Brown",
    status: "Преподаватель",
    email: "example@gmail.com",
    timeZone: "Asia/Dubai GMT +4:00",
  },
  { id: 1349, name: "Александр Иванов", status: "Ученик", email: "test@test.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "fgdfg@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "sdfs@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "Александр Иванов", status: "Ученик", email: "saeju@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Ученик", email: "ukji@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "dhgtf@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  {
    id: 1349,
    name: "Александр Иванов",
    status: "Ученик",
    email: "example@gmail.com",
    timeZone: "Asia/Dubai GMT +4:00",
  },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "rtugb@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "fgdfg@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "sdfs@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "Александр Иванов", status: "Ученик", email: "saeju@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Ученик", email: "ukji@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "dhgtf@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
  { id: 1349, name: "John Brown", status: "Преподаватель", email: "rtugb@gmail.com", timeZone: "Asia/Dubai GMT +4:00" },
];

const UsersPage = () => {
  const { t } = translate("translate", { keyPrefix: "usersPage" });

  const { type, page } = useParams();

  const [usersPerPage] = useState(9);
  const [users, setUsers] = useState(mockData.slice(0, usersPerPage));
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearch = (word: string) => {
    setSearchWord(word);
  };

  const headColumns = ["ID", t("name"), t("status"), t("email"), t("timeZone"), ""];

  useEffect(() => {
    if (searchWord === "") {
      setUsers(mockData.slice(0, usersPerPage));
    } else {
      const filteredData = mockData.filter((el) => el.email.toLowerCase().includes(searchWord.toLowerCase()));
      setUsers(filteredData.slice(0, usersPerPage));
    }
    // eslint-disable-next-line
  }, [searchWord]);

  return (
    <Container className="usersPageContainer">
      <Menu />
      <Box className="contentUsersBox">
        <ControlsUsers searchWord={searchWord} cbHandleChangeSearch={handleChangeSearch} />
        <Table className="usersTable">
          <TableHead className="usersTableHead">
            <TableRow>
              {headColumns.map((el, ind) => (
                <TableCell key={ind}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length !== 0 ? (
              users.map((el, ind) => (
                <UserItem
                  key={ind}
                  id={el.id}
                  name={el.name}
                  email={el.email}
                  status={el.status}
                  timeZone={el.timeZone}
                />
              ))
            ) : (
              <TableRow className="emptyRowUsers">
                <TableCell colSpan={headColumns.length}>
                  <p>{t("emptyUsers")}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          count={mockData.length}
          itemsPerPage={usersPerPage}
          urlPage={`/users/${type}`}
          activePage={page as string}
          nameBtnBack={t("back")}
          nameBtnNext={t("next")}
        />
      </Box>
    </Container>
  );
};

export default UsersPage;
