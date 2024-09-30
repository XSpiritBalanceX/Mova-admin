import { useEffect, useState } from "react";
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
import "./ChangeUserPage.scss";

interface IChangeModules {
  general: JSX.Element;
  general_change: JSX.Element;
  languages: JSX.Element;
  languages_change: JSX.Element;
  schedule: JSX.Element;
  schedule_change: JSX.Element;
  [key: string]: JSX.Element;
  sub_pay: JSX.Element;
  change_password: JSX.Element;
}

const ChangeUserPage = () => {
  const { type } = useParams();

  const userType = localStorage.getItem("mova_admin_user_type");

  const [dynamicModules, setDynamicModules] = useState<IChangeModules>({
    general: <ProfileUser />,
    general_change: userType === "0" ? <SettingProfileStudent /> : <SettingProfileTeacher />,
    languages: <SettingTeacherLanguages />,
    languages_change: <SettingTeacherLanguages />,
    schedule: <SettingTeachSchedule />,
    schedule_change: <SettingTeachSchedule />,
    sub_pay: <Box>sub_pay</Box>,
    change_password: <Box>change_password</Box>,
  });

  useEffect(() => {
    if (type && type.includes("lessons_")) {
      const match = type.match(/(\d+)/);
      const lessonNumber = parseInt(match![0], 10);
      const updatedModules = { ...dynamicModules };

      for (let i = 1; i <= lessonNumber; i++) {
        updatedModules[`lessons_${i}`] = <SettingUserLessons />;
      }
      setDynamicModules(updatedModules);
    }
    // eslint-disable-next-line
  }, [type]);

  const excludesRoutes = ["general_change", "languages_change", "schedule_change"];

  return (
    <Container className="containerChangeUser">
      <Menu />
      <Box className="contentChangeUser">
        {!excludesRoutes.includes(type as string) && <ChangeUserMenu />}
        {dynamicModules[type as keyof IChangeModules]}
      </Box>
    </Container>
  );
};

export default ChangeUserPage;
