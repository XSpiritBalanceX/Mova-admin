import { Box, Button, FormLabel } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate, NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ControlledPassword from "@components/fields/ControlledPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./AdminSettingsModules.scss";

interface ISettingPassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const ChangeAdminPassword = () => {
  const { t } = translate("translate", { keyPrefix: "adminSettingsPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/settings");
  };

  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .required(t("errReqField"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, t("wrongFormatPassword")),
    new_password: Yup.string()
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .required(t("errReqField"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, t("wrongFormatPassword")),
    confirm_password: Yup.string()
      .required(t("errReqField"))
      .oneOf([Yup.ref("new_password")], t("passDontMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingPassword>({
    resolver: yupResolver(validationSchema),
  });

  const submitChangePassword = (data: ISettingPassword) => {
    console.log(data);
  };

  return (
    <Box className="changeAdminPasswordBox">
      <Button type="button" onClick={handleNavigate} className="navigateButton">
        <ArrowBackIosNewIcon />
        {t("profile")}
      </Button>
      <form onSubmit={handleSubmit(submitChangePassword)}>
        <Box className="oldPasswordBox">
          <FormLabel className={`fieldsLabel ${errors?.old_password ? "errLabel" : ""}`}>
            {t("enterOldPassword")}
          </FormLabel>
          <ControlledPassword
            control={control}
            name="old_password"
            placeholder={t("password")}
            error={errors?.old_password?.message}
          />
          <Box className="linkBox">
            <NavLink to={"/forgot_password"}>{t("forgotPassword")}</NavLink>
          </Box>
        </Box>
        <Box>
          <FormLabel className={`fieldsLabel ${errors?.new_password || errors?.confirm_password ? "errLabel" : ""}`}>
            {t("createNewPassword")}
          </FormLabel>
          <ControlledPassword
            control={control}
            name="new_password"
            placeholder={t("newPassword")}
            error={errors?.new_password?.message}
          />
          <ControlledPassword
            control={control}
            name="confirm_password"
            placeholder={t("confirmNewPassword")}
            error={errors?.confirm_password?.message}
          />
        </Box>
        <Button type="submit" className="submitPasswordButton">
          {t("saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default ChangeAdminPassword;
