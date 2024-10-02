import { Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useLocation } from "react-router-dom";
import GroupIcon from "@components/icons/GroupIcon";
import PaymentIcon from "@components/icons/PaymentIcon";
import BelIcon from "@components/icons/BelIcon";
import SupportIcon from "@components/icons/SupportIcon";
import SettingIcon from "@components/icons/SettingIcon";
import "./Menu.scss";

const Menu = () => {
  const { t } = translate("translate", { keyPrefix: "menu" });

  const { pathname } = useLocation();

  const handleClick = () => {
    localStorage.removeItem("mova_admin_user_type");
  };

  return (
    <Box className="menuBox">
      <NavLink
        to={"/users/all/1"}
        onClick={handleClick}
        className={() =>
          pathname.includes("users") || pathname.includes("user") || pathname.includes("create_admin")
            ? "nav-link active"
            : "nav-link"
        }
      >
        <GroupIcon
          fill={
            pathname.includes("users") || pathname.includes("user") || pathname.includes("create_admin")
              ? "#FFFFFF"
              : "#A2A2A2"
          }
        />
        {t("users")}
      </NavLink>
      <NavLink
        to={"/payments/all/1"}
        onClick={handleClick}
        className={() => (pathname.includes("payments") ? "nav-link active" : "nav-link")}
      >
        <PaymentIcon fill={pathname.includes("payments") ? "#FFFFFF" : "#A2A2A2"} />
        {t("payments")}
      </NavLink>
      <NavLink
        to={"/notifications/1"}
        onClick={handleClick}
        className={() =>
          pathname.includes("notifications") || pathname.includes("notification") ? "nav-link active" : "nav-link"
        }
      >
        <BelIcon
          fill={pathname.includes("notifications") || pathname.includes("notification") ? "#FFFFFF" : "#A2A2A2"}
        />
        {t("notifications")}
      </NavLink>
      <NavLink
        to={"/supports/1"}
        onClick={handleClick}
        className={() =>
          pathname.includes("supports") || pathname.includes("support") ? "nav-link active" : "nav-link"
        }
      >
        <SupportIcon fill={pathname.includes("supports") || pathname.includes("support") ? "#FFFFFF" : "#A2A2A2"} />
        {t("support")}
      </NavLink>
      <NavLink
        to={"/settings"}
        onClick={handleClick}
        className={() => (pathname.includes("settings") ? "nav-link active" : "nav-link")}
      >
        <SettingIcon fill={pathname.includes("settings") ? "#FFFFFF" : "#A2A2A2"} />
        {t("settings")}
      </NavLink>
    </Box>
  );
};

export default Menu;
