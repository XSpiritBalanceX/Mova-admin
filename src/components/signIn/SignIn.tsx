import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledPassword from "@components/fields/ControlledPassword";
import { NavLink } from "react-router-dom";
import "./SignIn.scss";

interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("reqEmail")).email(t("wrongEmail")),
    password: Yup.string()
      .required(t("reqPassword"))
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^[a-zA-Z0-9]+$/, t("wrongFormatPassword")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: yupResolver(validationSchema) });

  const submitSignIn = (data: ISignIn) => {
    console.log(data);
  };

  return (
    <Box className="signInBox">
      <p className="title">{t("enter")}</p>
      <form onSubmit={handleSubmit(submitSignIn)}>
        <Box className="signInFieldBox">
          <ControlledInput control={control} placeholder={t("email")} name="email" error={errors?.email?.message} />
        </Box>
        <Box className="signInFieldBox">
          <ControlledPassword
            control={control}
            placeholder={t("password")}
            name="password"
            error={errors?.password?.message}
          />
        </Box>
        <Box className="linkBox">
          <NavLink to={"/forgot_password/email"}>{t("forgetPassword")}</NavLink>
        </Box>
        <Box className="signInFieldBox"></Box>
        <Button type="submit" className="submitButton">
          {t("signIn")}
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;
