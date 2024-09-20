import { Box, Avatar, Button } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { language, level, TLanguages, TLevel } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import { listOfCountries } from "@utils/listOfCountries";
import "./ProfileUser.scss";

const mockData = {
  user: {
    id: 12,
    user_type: 0,
    avatar: null,
    first_name: "Мария",
    last_name: "Иванова",
    date_of_birth: "1995-05-25",
    email: "example@gmail.com",
    country: 25,
  },
  languages: [
    { language: 1, level: 2, goal: "Работа" },
    {
      language: 5,
      level: 1,
      goal: "Vivamus quis ipsum vitae elit semper semper. Sed scelerisque lacus orci, nec iaculis ante convallis vitae. Proin tempus nisi vitae tellus luctus, at dignissim leo ornare. Nulla at nisi leo. Suspendisse potenti. Donec commodo orci accumsan lorem molestie, id vestibulum dolor ullamcorper. ",
    },
    { language: 10, level: 3, goal: "Lorem ipsum" },
  ],
};

const ProfileUser = () => {
  const { t } = translate("translate", { keyPrefix: "changeUserPage" });

  const locale = useAppSelector(movaAdminSelectors.localeSelect);

  const { user_id } = useParams();
  const navigate = useNavigate();

  const handleChanging = () => {
    navigate(`/user/${user_id}/general_change`);
  };

  const userCountry = listOfCountries.find((el) => el.id === mockData.user.country);

  const userFields = [
    { title: "firstName", data: mockData.user.first_name },
    { title: "lastName", data: mockData.user.last_name },
    { title: "dateOfBirth", data: moment(mockData.user.date_of_birth, "YYYY-MM-DD").format("DD.MM.YYYY") },
    { title: "country", data: userCountry && (locale === "ru" ? userCountry.russianLabel : userCountry.englishLabel) },
  ];

  const statusFields = [
    { title: t("status"), data: mockData.user.user_type === 0 ? t("student") : t("teacher") },
    { title: "ID", data: mockData.user.id },
  ];

  const isStudent = localStorage.getItem("mova_admin_user_type") === "0";

  return (
    <Box className="containerProfileStudent">
      <Box className="userAvatarBox">
        {mockData.user.avatar ? (
          <Avatar src={mockData.user.avatar} alt="avatar" className="userAvatar" />
        ) : (
          <Box className="emptyUserAvatar">{`${mockData.user.first_name
            .charAt(0)
            .toUpperCase()}${mockData.user.last_name.charAt(0).toUpperCase()}`}</Box>
        )}
        <Button type="button" onClick={handleChanging}>
          {t("change")}
        </Button>
      </Box>
      <Box className="informationBox">
        {userFields.map((el, ind) => (
          <Box key={ind} className="itemInformationBox">
            <p className="titleText">{t(el.title)}</p> <p className="dataText">{el.data}</p>
          </Box>
        ))}
      </Box>
      <Box className="informationBox">
        {statusFields.map((el, ind) => (
          <Box key={ind} className="itemInformationBox">
            <p className="titleText">{el.title}</p> <p className="dataText">{el.data}</p>
          </Box>
        ))}
      </Box>
      <Box className="informationBox">
        <Box className="itemInformationBox">
          <p className="titleText">E-mail</p> <p className="dataText">{mockData.user.email}</p>
        </Box>
      </Box>
      {isStudent &&
        mockData.languages.length > 0 &&
        mockData.languages.map((el, ind) => (
          <Box key={ind} className="informationBox">
            <Box className="itemInformationBox">
              <p className="titleText">{t("learnLanguage")}</p>{" "}
              <p className="dataText">{language[locale as keyof TLanguages][el.language]}</p>
            </Box>
            <Box className="itemInformationBox">
              <p className="titleText">{t("levelOfLang")}</p>
              <p className="dataText">{level[locale as keyof TLevel][el.level]}</p>
            </Box>
            <Box className="itemInformationBox">
              <p className="titleText">{t("goalLearn")}</p>
              <p className="dataText">{el.goal}</p>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default ProfileUser;
