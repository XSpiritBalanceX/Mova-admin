import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams, useNavigate } from "react-router-dom";
import Schedule from "./Schedule";
import "./SettingTeachSchedule.scss";

const SettingTeachSchedule = () => {
  const { t } = translate("translate", { keyPrefix: "settingTeacherSchedule" });

  const { type, user_id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/user/${user_id}/${e.currentTarget.name}`);
  };

  return (
    <Box className="settingTeacherScheduleBox">
      {type === "schedule" && (
        <Box className={`buttonsNavigateBox scheduleChangeButton`}>
          <Button type="button" name="schedule_change" onClick={handleNavigate}>
            {t("change")}
          </Button>
        </Box>
      )}
      {type === "schedule_change" && (
        <Box className={`buttonsNavigateBox`}>
          <Button type="button" name="schedule" onClick={handleNavigate}>
            <ArrowBackIosNewIcon />
          </Button>
        </Box>
      )}
      <Schedule />
    </Box>
  );
};

export default SettingTeachSchedule;
