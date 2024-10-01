import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SettingUserInformation from "@components/settingUserInformation/SettingUserInformation";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "@components/userAvatar/UserAvatar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./SettingProfileTeacher.scss";

const mockData = {
  user: {
    id: "10",
    user_type: 1,
    avatar: null,
    first_name: "Teacher",
    last_name: "Teacher",
    date_of_birth: "1992-08-25",
    email: "example@gmail.com",
    country: 20,
  },
};

interface ITeacherProfileInformation {
  user_information: {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birthday: { day: string; month: string; year: string };
    email: string;
    country: string;
    status: string;
  };
}

const SettingProfileTeacher = () => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const navigate = useNavigate();
  const { user_id } = useParams();

  const [initialValues, setInitialValues] = useState<ITeacherProfileInformation>({
    user_information: {
      id: "",
      first_name: "",
      last_name: "",
      date_of_birthday: { day: "", month: "", year: "" },
      email: "",
      country: "",
      status: "",
    },
  });

  const arrDateOfBirth = mockData.user.date_of_birth ? mockData.user.date_of_birth.split("-").reverse() : ["", "", ""];

  useEffect(() => {
    const compiledDataStudent = {
      id: mockData.user.id,
      first_name: mockData.user.first_name,
      last_name: mockData.user.last_name,
      date_of_birthday: { day: arrDateOfBirth[0], month: arrDateOfBirth[1], year: arrDateOfBirth[2] },
      email: mockData.user.email,
      country: mockData.user.country ? mockData.user.country.toString() : "",
      status: mockData.user.user_type.toString(),
    };
    setInitialValues({ user_information: compiledDataStudent });
    // eslint-disable-next-line
  }, []);

  const handleNavigate = () => {
    navigate(`/user/${user_id}/general`);
  };

  const validationSchema = Yup.object().shape({
    user_information: Yup.object({
      id: Yup.string().required(t("errReqField")),
      first_name: Yup.string().required(t("errReqField")).min(3, t("errLetterNumber")).max(20, t("errLetterNumber")),
      last_name: Yup.string().required(t("errReqField")).min(3, t("errLetterNumber")).max(20, t("errLetterNumber")),
      date_of_birthday: Yup.object({
        day: Yup.string().required(t("errReqField")),
        month: Yup.string().required(t("errReqField")),
        year: Yup.string().required(t("errReqField")),
      }),
      email: Yup.string().required(t("reqEmail")).email(t("wrongEmail")),
      country: Yup.string().default(""),
      status: Yup.string().required(t("errReqField")),
    }),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ITeacherProfileInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const handleSubmitTeacherProfile = (data: ITeacherProfileInformation) => {
    console.log(data);
  };

  return (
    <Box className="settingProfileTeacherBox">
      <Box className="buttonAvatarBox">
        <Button type="button" onClick={handleNavigate} className="navigationButton">
          <ArrowBackIosNewIcon />
        </Button>
        <UserAvatar
          photo={mockData.user.avatar}
          first_name={watch("user_information.first_name") || ""}
          last_name={watch("user_information.last_name") || ""}
        />
      </Box>
      <form onSubmit={handleSubmit(handleSubmitTeacherProfile)}>
        <SettingUserInformation control={control} errors={errors} />
        <Button type="submit" className="submitButtonProfile">
          {t("saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default SettingProfileTeacher;
