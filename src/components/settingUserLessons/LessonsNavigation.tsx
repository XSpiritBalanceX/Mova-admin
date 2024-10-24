import { Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "./SettingUserLessons.scss";

const LessonsNavigation = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserLessons" });

  const { pathname } = useLocation();
  const { user_id } = useParams();

  return (
    <Box className="navigationLessonsBox">
      <NavLink
        to={`/user/${user_id}/lessons/upcoming/1`}
        className={({ isActive }) =>
          isActive || pathname.startsWith("/lessons/upcoming") ? "nav-link active" : "nav-link"
        }
      >
        {t("upcomingLessons")}
      </NavLink>
      <NavLink
        to={`/user/${user_id}/lessons/past/1`}
        className={({ isActive }) =>
          isActive || pathname.startsWith("/lessons/past") ? "nav-link active" : "nav-link"
        }
      >
        {t("pastLessons")}
      </NavLink>
      <NavLink
        to={`/user/${user_id}/lessons/canceled/1`}
        className={({ isActive }) =>
          isActive || pathname.startsWith("/lessons/canceled") ? "nav-link active" : "nav-link"
        }
      >
        {t("canceledLessons")}
      </NavLink>
    </Box>
  );
};

export default LessonsNavigation;
