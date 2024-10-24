import { Box, Container } from "@mui/material";
import Menu from "@components/menu/Menu";
import { useParams } from "react-router-dom";
import ChangeUserMenu from "./ChangeUserMenu";
import ProfileUser from "@components/profileUser/ProfileUser";
import SettingProfileStudent from "@components/settingProfileStudent/SettingProfileStudent";
import SettingProfileTeacher from "@components/settingProfileTeacher/SettingProfileTeacher";
import SettingTeacherLanguages from "@components/settingTeacherLanguages/SettingTeacherLanguages";
import SettingTeachSchedule from "@components/settingTeacherSchedule/SettingTeachSchedule";
import SettingUserLessons from "@components/settingUserLessons/SettingUserLessons";
import SettingUserSubscription from "@components/settingUserSubscription/SettingUserSubscription";
import SettingUserPassword from "@components/settingUserPassword/SettingUserPassword";
import "./ChangeUserPage.scss";

interface IChangeModules {
  general: JSX.Element;
  general_change: JSX.Element;
  languages: JSX.Element;
  languages_change: JSX.Element;
  schedule: JSX.Element;
  schedule_change: JSX.Element;
  lessons: JSX.Element;
  sub_pay: JSX.Element;
  change_password: JSX.Element;
}

const ChangeUserPage = () => {
  const { type } = useParams();

  const userType = localStorage.getItem("mova_admin_user_type");

  const settingsModules: IChangeModules = {
    general: <ProfileUser />,
    general_change: userType === "0" ? <SettingProfileStudent /> : <SettingProfileTeacher />,
    languages: <SettingTeacherLanguages />,
    languages_change: <SettingTeacherLanguages />,
    schedule: <SettingTeachSchedule />,
    schedule_change: <SettingTeachSchedule />,
    lessons: <SettingUserLessons />,
    sub_pay: <SettingUserSubscription />,
    change_password: <SettingUserPassword />,
  };

  const excludesRoutes = ["general_change", "languages_change", "schedule_change"];

  return (
    <Container className="containerChangeUser">
      <Menu />
      <Box className="contentChangeUser">
        {!excludesRoutes.includes(type as string) && <ChangeUserMenu />}
        {settingsModules[type as keyof IChangeModules]}
      </Box>
    </Container>
  );
};

export default ChangeUserPage;
