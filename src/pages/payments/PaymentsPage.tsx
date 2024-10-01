import { useEffect, useState } from "react";
import { Container, Box, Table, TableHead, TableRow, TableCell } from "@mui/material";
import Menu from "@components/menu/Menu";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import "./PaymentsPage.scss";

const mockData = [
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "0",
    email: "example@gmail.com",
    last_payment: "2024-09-12",
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
    last_payment: "2024-09-12",
    card: "Visa ****2979",
  },
  {
    id: "00349",
    first_name: "Alexander",
    last_name: "Kuznetsov",
    status: "0",
    email: "example@gmail.com",
    last_payment: "2024-09-12",
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
    last_payment: "2024-09-12",
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
        <Table className="paymentsTable">
          <TableHead className="paymentsTableHead">
            <TableRow>
              {headColumns.map((el, ind) => (
                <TableCell key={ind}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Box>
    </Container>
  );
};

export default PaymentsPage;
