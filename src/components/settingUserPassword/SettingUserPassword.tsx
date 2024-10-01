import { Box, Button, FormLabel } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledPassword from "@components/fields/ControlledPassword";
import "./SettingUserPassword.scss";

interface ISettingPassword {
  new_password: string;
  confirm_password: string;
}

const SettingUserPassword = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserPassword" });

  const validationSchema = Yup.object().shape({
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
    <Box className="settingPasswordBox">
      <form onSubmit={handleSubmit(submitChangePassword)}>
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
        <Button type="submit" className="submitPasswordButton">
          {t("saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default SettingUserPassword;
