import { Box } from "@mui/material";
import { translate } from "@i18n";
import "./PasswordRecovery.scss";

const PasswordForm = () => {
  const { t } = translate("translate", { keyPrefix: "forgotPasswordPage" });
  return <Box>PasswordForm</Box>;
};

export default PasswordForm;
