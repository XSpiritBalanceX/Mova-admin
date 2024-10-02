import { Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { translate } from "@i18n";
import Menu from "@components/menu/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import moment from "moment";
import "./SupportPage.scss";

const mockData = {
  id: "00349",
  date: "2024-03-25 17:45",
  first_name: "John",
  last_name: "Brown",
  status: 1,
  email: "example@gmail.com",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.",
};

const SupportItemPage = () => {
  const { t } = translate("translate", { keyPrefix: "supportPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/supports/1");
  };

  const dateTimeFields = [
    { label: "date", data: moment(mockData.date, "YYYY-MM-DD HH:mm").format("DD.MM.YYYY") },
    { label: "time", data: moment(mockData.date, "YYYY-MM-DD HH:mm").format("HH:mm") },
  ];

  const supportDataFields = [
    { label: t("firstLastName"), data: `${mockData.first_name} ${mockData.last_name}` },
    { label: "ID", data: mockData.id },
    { label: t("status"), data: mockData.status === 0 ? t("student") : t("teacher") },
    { label: "E-mail", data: mockData.email },
  ];

  return (
    <Container className="supportItemPageContainer">
      <Menu />
      <Box className="contentSupportItemPage">
        <Box className="navigationButtonBox">
          <Button type="button" onClick={handleNavigate}>
            <ArrowBackIosNewIcon />
            {t("message")}
          </Button>
        </Box>
        <Box className="supportInfoBox">
          {dateTimeFields.map((el, ind) => (
            <Box key={ind} className="itemInfoSupport">
              <p className="labelText">{t(el.label)}</p>
              <p className="dataText">{el.data}</p>
            </Box>
          ))}
        </Box>
        <Box className="supportInfoBox">
          {supportDataFields.map((el, ind) => (
            <Box key={ind} className="itemInfoSupport">
              <p className="labelText">{el.label}</p>
              <p className="dataText">{el.data}</p>
            </Box>
          ))}
        </Box>
        <Box className="textSupportBox">
          <p className="labelTextSupport">{t("message")}</p>
          <Box className="dataTextSupportBox">{mockData.text}</Box>
        </Box>
        <Box className="materialsSupportBox">
          <p className="labelMaterialSupport">{t("attachedMaterials")}</p>
        </Box>
      </Box>
    </Container>
  );
};

export default SupportItemPage;
