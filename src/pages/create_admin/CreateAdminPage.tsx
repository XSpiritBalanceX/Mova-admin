import { Container, Box, Button } from "@mui/material";
import Menu from "@components/menu/Menu";
import { translate } from "@i18n";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledPassword from "@components/fields/ControlledPassword";
import "./CreateAdminPage.scss";

interface INewAdmin {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const CreateAdminPage = () => {
  const { t } = translate("translate", { keyPrefix: "createAdminPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/users/all/1");
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t("errReqField")),
    last_name: Yup.string().required(t("errReqField")),
    email: Yup.string().required(t("errReqField")).email(t("wrongEmail")),
    password: Yup.string()
      .required(t("errReqField"))
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^[a-zA-Z0-9]+$/, t("wrongFormatPassword")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewAdmin>({ resolver: yupResolver(validationSchema) });

  const submitCreatingAdmin = (data: INewAdmin) => {
    console.log(data);
  };

  const fields = [
    { name: "first_name", placeholder: "firstName", err: errors?.first_name?.message },
    { name: "last_name", placeholder: "lastName", err: errors?.last_name?.message },
    { name: "email", placeholder: "email", err: errors?.email?.message },
  ];

  return (
    <Container className="containerCreateAdmin">
      <Menu />
      <Box className="contentCreateAdmin">
        <Box>
          <Button type="button" onClick={handleNavigate} className="navigateButton">
            <ArrowBackIosNewIcon />
            {t("createAdmin")}
          </Button>
        </Box>
        <form onSubmit={handleSubmit(submitCreatingAdmin)}>
          {fields.map((el, ind) => (
            <ControlledInput
              key={ind}
              control={control}
              name={el.name}
              placeholder={t(el.placeholder)}
              error={el.err}
            />
          ))}
          <ControlledPassword
            control={control}
            name={"password"}
            placeholder={t("password")}
            error={errors?.password?.message}
          />
          <Button type="submit" className="submitButton">
            {t("create")}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateAdminPage;
