import { Box, Button, TableRow, TableCell } from "@mui/material";
import { translate } from "@i18n";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./NotificationItem.scss";

interface INotificationItemProps {
  id: string;
  date: string;
  first_name: string;
  last_name: string;
  status: number;
  email: string;
  notification_type: string;
  notification_text: string;
}

const NotificationItem = ({
  id,
  date,
  first_name,
  last_name,
  status,
  email,
  notification_type,
  notification_text,
}: INotificationItemProps) => {
  const { t } = translate("translate", { keyPrefix: "notificationsPage" });

  const navigate = useNavigate();

  const handleShowProfile = () => {
    status === 0 && localStorage.setItem("mova_admin_user_type", "0");
    status === 1 && localStorage.setItem("mova_admin_user_type", "1");
    navigate(`/notification/${id}`);
  };

  return (
    <TableRow className="notificationItemRow">
      <TableCell>
        <Box className="notificationItemBox">{moment(date, "YYYY-MM-DD HH:mm").format("DD.MM.YY")}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox">{moment(date, "YYYY-MM-DD HH:mm").format("HH:mm")}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox">{id}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox userNameBox">{`${first_name} ${last_name}`}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox">{status === 0 ? t("student") : t("teacher")}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox">{email}</Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox notificationItemTypeText">
          <p className="notificationType">
            {notification_type === "notification"
              ? t("notificationLesson")
              : notification_type === ""
              ? t("canceledLesson")
              : "canceled"}
          </p>
          <p className="notificationText">{notification_text.slice(0, 20)}</p>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="notificationItemBox">
          <Button type="button" className="buttonInfo" onClick={handleShowProfile}>
            <InfoOutlinedIcon />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default NotificationItem;
