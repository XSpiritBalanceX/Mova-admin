import { Box, Button, TableRow, TableCell } from "@mui/material";
import { translate } from "@i18n";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./SupportItem.scss";

interface ISupportItemProps {
  id: string;
  date: string;
  first_name: string;
  last_name: string;
  status: number;
  email: string;
  message: string;
}

const SupportItem = ({ id, date, first_name, last_name, status, email, message }: ISupportItemProps) => {
  const { t } = translate("translate", { keyPrefix: "supportPage" });

  const navigate = useNavigate();

  const handleShowProfile = () => {
    status === 0 && localStorage.setItem("mova_admin_user_type", "0");
    status === 1 && localStorage.setItem("mova_admin_user_type", "1");
    navigate(`/support/${id}`);
  };

  return (
    <TableRow className="supportItemRow">
      <TableCell>
        <Box className="supportItemBox">{moment(date, "YYYY-MM-DD HH:mm").format("DD.MM.YY")}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox">{moment(date, "YYYY-MM-DD HH:mm").format("HH:mm")}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox">{id}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox userNameBox">{`${first_name} ${last_name}`}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox">{status === 0 ? t("student") : t("teacher")}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox">{email}</Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox supportItemMessage">
          {message.length > 200 ? `${message.slice(0, 200)}...` : message}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="supportItemBox">
          <Button type="button" className="buttonInfo" onClick={handleShowProfile}>
            <InfoOutlinedIcon />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SupportItem;
