import { useEffect, useState } from "react";
import { Container, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Menu from "@components/menu/Menu";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import CustomPagination from "@components/pagination/CustomPagination";
import "./SupportPage.scss";

const mockData = [
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 1,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 1,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 0,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
  {
    id: "00349",
    date: "2024-03-25 17:45",
    first_name: "John",
    last_name: "Brown",
    status: 1,
    email: "example@gmail.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
  },
];

const SupportPage = () => {
  const { t } = translate("translate", { keyPrefix: "supportPage" });

  const { page } = useParams();

  const [supportPerPage] = useState(8);
  const [supportsItems, setSupportsItems] = useState(mockData.slice(0, supportPerPage));
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearch = (word: string) => {
    setSearchWord(word);
  };

  const headColumns = [t("date"), t("time"), "ID", t("firstLastName"), t("status"), "E-mail", t("message"), ""];

  useEffect(() => {
    if (searchWord === "") {
      setSupportsItems(mockData.slice(0, supportPerPage));
    } else {
      const filteredData = mockData.filter((el) => el.email.toLowerCase().includes(searchWord.toLowerCase()));
      setSupportsItems(filteredData.slice(0, supportPerPage));
    }
    // eslint-disable-next-line
  }, [searchWord]);

  return (
    <Container className="supportPageContainer">
      <Menu />
      <Box className="contentSupportPage">
        <Table className="supportPageTable">
          <TableHead className="supportTableHead">
            <TableRow>
              {headColumns.map((el, ind) => (
                <TableCell key={ind}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {supportsItems.length !== 0 ? (
              supportsItems.map((el, ind) => <p>{el.date}</p>)
            ) : (
              <TableRow className="emptyRowUsers">
                <TableCell colSpan={headColumns.length}>
                  <p>{t("emptySupport")}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          count={mockData.length}
          itemsPerPage={supportPerPage}
          urlPage={`/supports`}
          activePage={page as string}
          nameBtnBack={t("back")}
          nameBtnNext={t("next")}
        />
      </Box>
    </Container>
  );
};

export default SupportPage;
