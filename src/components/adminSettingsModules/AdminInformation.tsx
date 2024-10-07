import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./AdminSettingsModules.scss";

const mockData = {
  first_name: "Мария",
  last_name: "Иванова",
  email: "example@gmail.com",
  date_of_birth: "1995-12-03",
  avatar: null,
};

const AdminInformation = () => {
  const { t } = translate("translate", { keyPrefix: "adminSettingsPage" });

  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(e.currentTarget.name);
  };

  const nameFields = [
    { label: "firstName", data: mockData.first_name },
    { label: "lastName", data: mockData.last_name },
  ];

  const infoFields = [
    { label: "E-mail", data: mockData.email },
    { label: t("dateOfBirth"), data: moment(mockData.date_of_birth, "YYYY-MM-DD").format("DD.MM.YYYY") },
  ];

  return (
    <Box className="adminInformationContainer">
      <Box className="avatarButtonBox">
        {mockData.avatar && <Avatar src={mockData.avatar} alt="admin" className="adminAvatar" />}
        {!mockData.avatar && (
          <Box className="emptyAdminAvatar">{`${mockData.first_name.charAt(0)}${mockData.last_name.charAt(0)}`}</Box>
        )}
        <Button type="button" name="/settings/admin" onClick={handleNavigate}>
          {t("change")}
        </Button>
      </Box>
      <Box className="adminInformationBox">
        {nameFields.map((el, ind) => (
          <Box key={ind} className="itemInformation">
            <p className="labelInformation">{t(el.label)}</p>
            <p className="dataInformation">{el.data}</p>
          </Box>
        ))}
      </Box>
      <Box className="adminInformationBox">
        {infoFields.map((el, ind) => (
          <Box key={ind} className="itemInformation">
            <p className="labelInformation">{el.label}</p>
            <p className="dataInformation">{el.data}</p>
          </Box>
        ))}
      </Box>
      <Button type="button" name="/settings/password" onClick={handleNavigate} className="changePasswordButton">
        {t("changePassword")}
      </Button>
    </Box>
  );
};

export default AdminInformation;
