import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import "./PasswordRecovery.scss";

interface IEmailForm {
  email: string;
}

const EmailForm = () => {
  const { t } = translate("translate", { keyPrefix: "forgotPasswordPage" });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("reqEmail")).email(t("wrongEmail")),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEmailForm>({
    resolver: yupResolver(validationSchema),
  });

  const submitEmailForm = (data: IEmailForm) => {
    console.log(data);
  };

  return (
    <Box className="emailFormBox">
      <p className="title">{t("passwordRecovery")}</p>
      <p className="label">{t("textPasswordRecovery")}</p>
      <form onSubmit={handleSubmit(submitEmailForm)}>
        <ControlledInput control={control} name="email" placeholder={t("email")} error={errors?.email?.message} />
        <Button type="submit" disabled={!watch("email")} className="submitButton">
          {t("send")}
        </Button>
      </form>
    </Box>
  );
};

export default EmailForm;
