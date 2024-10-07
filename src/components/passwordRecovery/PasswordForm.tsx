import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledPassword from "@components/fields/ControlledPassword";
import "./PasswordRecovery.scss";

interface IPasswordForm {
  new_password: string;
  confirm_password: string;
}

const PasswordForm = () => {
  const { t } = translate("translate", { keyPrefix: "forgotPasswordPage" });

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
    watch,
    formState: { errors },
  } = useForm<IPasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const submitPasswordForm = (data: IPasswordForm) => {
    console.log(data);
  };

  return (
    <Box className="passwordFormBox">
      <p className="title">{t("passwordRecovery")}</p>
      <p className="label">{t("createNewPassword")}</p>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
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
        <Button type="submit" disabled={!watch("confirm_password") || !watch("new_password")} className="submitButton">
          {t("save")}
        </Button>
      </form>
    </Box>
  );
};

export default PasswordForm;
