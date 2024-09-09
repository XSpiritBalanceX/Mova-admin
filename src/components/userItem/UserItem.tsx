import { Box, Button, TableRow, TableCell } from "@mui/material";
import { translate } from "@i18n";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import "./UserItem.scss";

interface IUserItemProps {
  id: number;
  name: string;
  email: string;
  status: string;
  timeZone: string;
}

const UserItem = ({ id, name, email, status, timeZone }: IUserItemProps) => {
  const { t } = translate("translate", { keyPrefix: "usersPage" });
  const navigate = useNavigate();

  const handleShowProfile = () => {
    navigate(`/user/${id}`);
  };
  return (
    <TableRow className="userItemRow">
      <TableCell>
        <Box className="userItemBox">{id}</Box>
      </TableCell>
      <TableCell>
        <Box className="userItemBox">{name}</Box>
      </TableCell>
      <TableCell>
        <Box className="userItemBox">{status}</Box>
      </TableCell>
      <TableCell>
        <Box className="userItemBox">{email}</Box>
      </TableCell>
      <TableCell>
        <Box className="userItemBox">{timeZone}</Box>
      </TableCell>
      <TableCell>
        <Box className="userItemBox">
          <Button type="button" className="buttonInfo" onClick={handleShowProfile}>
            <InfoOutlinedIcon />
            {t("info")}
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
