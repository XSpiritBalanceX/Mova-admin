import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import BucketIcon from "@components/icons/BucketIcon";
import Cards from "react-credit-cards-2";
import Slider from "react-slick";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "slick-carousel/slick/slick.css";
import "./SettingUserSubscription.scss";

const mockData = [
  {
    id: 1,
    card_number: "4201 4201 6650 6650",
    card_exp_date: "07/25",
    card_name: "John Smith",
    cvc: "123",
    is_active: false,
  },
  {
    id: 2,
    card_number: "5201 4201 2349 2349",
    card_exp_date: "07/25",
    card_name: "John Smith",
    cvc: "123",
    is_active: true,
  },
  {
    id: 3,
    card_number: "3201 4201 2349 2349",
    card_exp_date: "07/25",
    card_name: "John Smith",
    cvc: "123",
    is_active: false,
  },
];

const UserBankCards = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const handleDeleteCard = (id: number) => {
    console.log("forget", id);
  };

  const handleMakeActive = (id: number) => {
    console.log("make active card", id);
  };

  return (
    <Box className="userBankCardsBox">
      <p className="titleBankCard">{t("paymentMethod")}</p>
      <Slider {...settings} className="bankCardSlider">
        {mockData.map((el, ind) => (
          <Box key={ind} className="bankCardBox">
            <Box className="cardBox">
              <Box
                className={`isActiveCardBox ${el.is_active ? "activeCardBox" : ""}`}
                onClick={() => handleMakeActive(el.id)}
              >
                {el.is_active && <Box className="active" />}
              </Box>
              <Cards
                number={el.card_number}
                expiry={el.card_exp_date}
                name={el.card_name}
                cvc={el.cvc}
                preview={true}
              />
            </Box>
            <Button type="button" className="forgetCardButton" onClick={() => handleDeleteCard(el.id)}>
              <BucketIcon fill="#c60202" /> {t("deleteCard")}
            </Button>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default UserBankCards;
