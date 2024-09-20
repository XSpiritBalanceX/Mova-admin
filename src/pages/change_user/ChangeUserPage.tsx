import { Box, Container } from "@mui/material";
import Menu from "@components/menu/Menu";
import { useParams } from "react-router-dom";
import ChangeUserMenu from "./ChangeUserMenu";
import ProfileUser from "@components/profileUser/ProfileUser";
import SettingProfileStudent from "@components/settingProfileStudent/SettingProfileStudent";
import SettingProfileTeacher from "@components/settingProfileTeacher/SettingProfileTeacher";
import "./ChangeUserPage.scss";

interface IChangeModules {
  general: JSX.Element;
  general_change: JSX.Element;
  languages: JSX.Element;
  schedule: JSX.Element;
  lessons: JSX.Element;
  sub_pay: JSX.Element;
  change_password: JSX.Element;
}

const ChangeUserPage = () => {
  const { type } = useParams();

  const userType = localStorage.getItem("mova_admin_user_type");

  const modules: IChangeModules = {
    general: <ProfileUser />,
    general_change: userType === "0" ? <SettingProfileStudent /> : <SettingProfileTeacher />,
    languages: <Box>languages</Box>,
    schedule: <Box>schedule</Box>,
    lessons: <Box>lessons</Box>,
    sub_pay: <Box>sub_pay</Box>,
    change_password: <Box>change_password</Box>,
  };

  return (
    <Container className="containerChangeUser">
      <Menu />
      <Box className="contentChangeUser">
        {type !== "general_change" && <ChangeUserMenu />}
        {modules[type as keyof IChangeModules]}
      </Box>
    </Container>
  );
};

export default ChangeUserPage;
