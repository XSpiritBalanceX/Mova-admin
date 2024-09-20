import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./ChangeUserPage.scss";

const ChangeUserMenu = () => {
  const { t } = translate("translate", { keyPrefix: "changeUserPage" });

  const isTeacher = localStorage.getItem("mova_admin_user_type") === "1";

  const navigate = useNavigate();
  const { user_id, type } = useParams();

  const handleNavigate = () => {
    localStorage.removeItem("mova_admin_user_type");
    navigate("/users/all/1");
  };

  const buttons = [
    {
      title: "general",
      name: "general",
    },
    {
      title: "myLessons",
      name: "lessons",
    },
    {
      title: "payments",
      name: "sub_pay",
    },
    {
      title: "changePassword",
      name: "change_password",
    },
  ];

  if (isTeacher) {
    buttons.splice(
      1,
      0,
      {
        title: "languages",
        name: "languages",
      },
      {
        title: "schedule",
        name: "schedule",
      },
    );
  }

  const handleNavigateChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/user/${user_id}/${e.currentTarget.name}`);
  };

  return (
    <Box className="changeUserMenuBox">
      <Button type="button" onClick={handleNavigate} className="navigateButton">
        <ArrowBackIosNewIcon />
      </Button>
      {buttons.map((el, ind) => (
        <Button
          key={ind}
          name={el.name}
          type="button"
          onClick={handleNavigateChanges}
          className={type === el.name ? "activeButton" : ""}
        >
          {t(el.title)}
        </Button>
      ))}
    </Box>
  );
};

export default ChangeUserMenu;
