import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UserAvatar from "@components/userAvatar/UserAvatar";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledSelect from "@components/fields/ControlledSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import "./AdminSettingsModules.scss";

const mockData = {
  first_name: "Мария",
  last_name: "Иванова",
  email: "example@gmail.com",
  date_of_birth: "1995-12-03",
  avatar: null,
};

interface IAdminInformation {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: { day: string; month: string; year: string };
}

const ChangeAdminProfile = () => {
  const { t } = translate("translate", { keyPrefix: "adminSettingsPage" });

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<IAdminInformation>({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: { day: "", month: "", year: "" },
  });

  const arrDateOfBirth = mockData.date_of_birth ? mockData.date_of_birth.split("-").reverse() : ["", "", ""];

  useEffect(() => {
    const compiledDataAdmin = {
      first_name: mockData.first_name,
      last_name: mockData.last_name,
      email: mockData.email,
      date_of_birth: {
        day: moment().day(arrDateOfBirth[0]).format("D"),
        month: arrDateOfBirth[1],
        year: arrDateOfBirth[2],
      },
    };
    setInitialValues(compiledDataAdmin);
    // eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t("errReqField")).min(3, t("errLetterNumber")).max(20, t("errLetterNumber")),
    last_name: Yup.string().required(t("errReqField")).min(3, t("errLetterNumber")).max(20, t("errLetterNumber")),
    email: Yup.string().required(t("errReqField")).email(t("wrongEmail")),
    date_of_birth: Yup.object({
      day: Yup.string().required(t("errReqField")),
      month: Yup.string().required(t("errReqField")),
      year: Yup.string().required(t("errReqField")),
    }),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAdminInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const handleSubmitAdminProfile = (data: IAdminInformation) => {
    console.log(data);
  };

  const handleNavigate = () => {
    navigate("/settings");
  };

  const firstLastName = [
    {
      label: "firstName",
      name: "first_name",
      error: errors?.first_name?.message,
    },
    {
      label: "lastName",
      name: "last_name",
      error: errors?.last_name?.message,
    },
  ];

  const currentYear = moment().year();
  const dateOfBirthFields = [
    {
      label: "day",
      name: "date_of_birth.day",
      error: errors?.date_of_birth?.day?.message,
      options: Array.from({ length: 31 }, (_, ind) => ({ id: (ind + 1).toString(), label: (ind + 1).toString() })),
    },
    {
      label: "month",
      name: "date_of_birth.month",
      error: errors?.date_of_birth?.month?.message,
      options: Array.from({ length: 12 }, (_, index) => ({
        id: String(index + 1).padStart(2, "0"),
        label: moment().month(index).format("MMMM"),
      })),
    },
    {
      label: "year",
      name: "date_of_birth.year",
      error: errors?.date_of_birth?.year?.message,
      options: Array.from({ length: 71 }, (_, ind) => {
        const year = currentYear - ind;
        return { id: year.toString(), label: year.toString() };
      }).filter((year) => Number(year.id) <= currentYear - 18 && Number(year.id) >= currentYear - 70),
    },
  ];

  return (
    <Box className="changeAdminProfileBox">
      <Button type="button" onClick={handleNavigate} className="navigateButton">
        <ArrowBackIosNewIcon />
        {t("profile")}
      </Button>
      <UserAvatar photo={mockData.avatar} first_name={mockData.first_name} last_name={mockData.last_name} />
      <form onSubmit={handleSubmit(handleSubmitAdminProfile)} className="adminProfileForm">
        {firstLastName.map((el, ind) => (
          <ControlledInput key={ind} control={control} name={el.name} error={el.error} placeholder={t(el.label)} />
        ))}
        <Box className="dateOfBirthBox">
          <p className="labelBox">{t("dateOfBirth")}</p>
          <Box className="dateOfBirthFields">
            {dateOfBirthFields.map((el, ind) => (
              <ControlledSelect
                key={ind}
                control={control}
                name={el.name}
                placeholder={el.label}
                error={el.error}
                options={el.options}
              />
            ))}
          </Box>
        </Box>
        <ControlledInput control={control} name="email" error={errors?.email?.message} placeholder="E-mail" />
        <Button type="submit" className="submitButton">
          {t("saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default ChangeAdminProfile;
