import { useEffect, useState } from "react";
import { Container, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Menu from "@components/menu/Menu";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import ControlsPayments from "@components/controlsPayments/ControlsPayments";
import PaymentsItem from "@components/paymentItem/PaymentsItem";
import CustomPagination from "@components/pagination/CustomPagination";
import "./PaymentsPage.scss";

const mockData = [
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "0",
    email: "example@gmail.com",
    last_payment: "2024-10-12",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "1",
    email: "example@gmail.com",
    last_payment: "2024-08-05",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "1",
    email: "example@gmail.com",
    last_payment: "2024-10-12",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "0",
    email: "example@gmail.com",
    last_payment: "2024-10-12",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "1",
    email: "example@gmail.com",
    last_payment: "2024-08-05",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "0",
    email: "example@gmail.com",
    last_payment: "2024-10-12",
    card: "Visa ****2979",
  },
];

const PaymentsPage = () => {
  const { t } = translate("translate", { keyPrefix: "paymentsPage" });

  const { type, page } = useParams();

  const [paymentPerPage] = useState(6);
  const [payments, setPayments] = useState(mockData.slice(0, paymentPerPage));
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearch = (word: string) => {
    setSearchWord(word);
  };

  const headColumns = ["ID", t("firstLastName"), t("status"), "E-mail", t("lastPayment"), t("methodPayment")];

  useEffect(() => {
    if (searchWord === "") {
      setPayments(mockData.slice(0, paymentPerPage));
    } else {
      const filteredData = mockData.filter((el) => el.email.toLowerCase().includes(searchWord.toLowerCase()));
      setPayments(filteredData.slice(0, paymentPerPage));
    }
    // eslint-disable-next-line
  }, [searchWord]);

  return (
    <Container className="containerPaymentsPage">
      <Menu />
      <Box className="contentPaymentsPage">
        <ControlsPayments searchWord={searchWord} cbHandleChangeSearch={handleChangeSearch} />
        <Table className="paymentsTable">
          <TableHead className="paymentsTableHead">
            <TableRow>
              {headColumns.map((el, ind) => (
                <TableCell key={ind}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length !== 0 ? (
              payments.map((el, ind) => (
                <PaymentsItem
                  key={ind}
                  id={el.id}
                  first_name={el.first_name}
                  last_name={el.last_name}
                  email={el.email}
                  status={el.status}
                  last_payment={el.last_payment}
                  payment_method={el.card}
                />
              ))
            ) : (
              <TableRow className="emptyRowUsers">
                <TableCell colSpan={headColumns.length}>
                  <p>{t("emptyPayments")}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          count={mockData.length}
          itemsPerPage={paymentPerPage}
          urlPage={`/payments/${type}`}
          activePage={page as string}
          nameBtnBack={t("back")}
          nameBtnNext={t("next")}
        />
      </Box>
    </Container>
  );
};

export default PaymentsPage;
