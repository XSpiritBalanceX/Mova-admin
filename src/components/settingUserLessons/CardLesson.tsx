import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { ILesson } from "./SettingUserLessons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./SettingUserLessons.scss";

interface ICardLessonProps {
  lesson_information: ILesson;
  cbShowModal: (id: number) => void;
}

const CardLesson = ({ lesson_information, cbShowModal }: ICardLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "settingUserLessons" });

  const isStudent = localStorage.getItem("mova_admin_user_type") === "0";

  const navigate = useNavigate();

  const handleCancelLesson = () => {
    cbShowModal(lesson_information.id);
  };

  const handleShowUserPage = () => {
    isStudent && navigate(`/teacher/${lesson_information.teacher_id}`);
    !isStudent && navigate(`/student/${lesson_information.student_id}`);
  };

  return (
    <Box className="lessonBox">
      <Box className="dateCancelBox">
        <p className="dateOfLesson">
          {`${moment(lesson_information.date, "YYYY-MM-DD").format("DD MMMM")}, ${moment(
            lesson_information.time_start,
            "HH:mm",
          )
            .add(moment().utcOffset(), "minutes")
            .format("HH:mm")}`}
          <span className={`statusText ${lesson_information.status === "paid" ? "paidText" : "notPaidText"}`}>{`${
            lesson_information.status === "paid" ? t("paid") : t("notPayed")
          }`}</span>
        </p>
        <Button type="button" onClick={handleCancelLesson} className="cancelButton">
          {t("cancelLesson")}
        </Button>
      </Box>
      <Box className="lessonContent">
        <Box className="userInformationBox">
          {lesson_information.photo && (
            <Avatar src={lesson_information.photo} className="userAvatar" onClick={handleShowUserPage} />
          )}
          {!lesson_information.photo && (
            <Box className="emptyUserAvatarPhoto">{`${lesson_information.first_name.charAt(
              0,
            )}${lesson_information.last_name.charAt(0)}`}</Box>
          )}
          <p
            className="userName"
            onClick={handleShowUserPage}
          >{`${lesson_information.first_name} ${lesson_information.last_name}`}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default CardLesson;
