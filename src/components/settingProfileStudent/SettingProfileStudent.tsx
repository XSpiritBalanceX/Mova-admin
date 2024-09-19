import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IStudentFormInformation } from "./TypesSettingProfileStudent";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import StudentInformation from "./StudentInformation";
import UserAvatar from "@components/userAvatar/UserAvatar";
import "./SettingProfileStudent.scss";

const mockData = {
  user: {
    id: "12",
    user_type: 0,
    avatar: null,
    first_name: "Мария",
    last_name: "Иванова",
    date_of_birth: "1995-05-25",
    email: "example@gmail.com",
    country: 25,
  },
  languages: [
    { id: 1, language: 1, level: 2, goal: "Работа" },
    {
      id: 2,
      language: 5,
      level: 1,
      goal: "Vivamus quis ipsum vitae elit semper semper. Sed scelerisque lacus orci, nec iaculis ante convallis vitae. Proin tempus nisi vitae tellus luctus, at dignissim leo ornare. Nulla at nisi leo. Suspendisse potenti. Donec commodo orci accumsan lorem molestie, id vestibulum dolor ullamcorper. ",
    },
    { id: 3, language: 10, level: 3, goal: "Lorem ipsum" },
  ],
};

const SettingProfileStudent = () => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const navigate = useNavigate();
  const { user_id } = useParams();

  const [initialValues, setInitialValues] = useState<IStudentFormInformation>({
    user_information: {
      id: "",
      first_name: "",
      last_name: "",
      date_of_birthday: { day: "", month: "", year: "" },
      email: "",
      country: "",
      status: "",
    },
    learning_languages: [],
  });
  const [countOfLanguages, setCountOfLanguages] = useState<number>(initialValues.learning_languages.length || 1);

  const arrDateOfBirth = mockData.user.date_of_birth ? mockData.user.date_of_birth.split("-").reverse() : ["", "", ""];

  useEffect(() => {
    const compiledDataLanguages = mockData.languages.map((el) => {
      return { id: el.id, language: el.language.toString(), level: el.level.toString(), description: el.goal };
    });
    const compiledDataStudent = {
      id: mockData.user.id,
      first_name: mockData.user.first_name,
      last_name: mockData.user.last_name,
      date_of_birthday: { day: arrDateOfBirth[0], month: arrDateOfBirth[1], year: arrDateOfBirth[2] },
      email: mockData.user.email,
      country: mockData.user.country ? mockData.user.country.toString() : "",
      status: mockData.user.user_type.toString(),
    };
    setInitialValues({ user_information: compiledDataStudent, learning_languages: compiledDataLanguages });
    setCountOfLanguages(compiledDataLanguages.length);
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
    learning_languages: Yup.array()
      .of(
        Yup.object({
          id: Yup.number(),
          language: Yup.string().required(t("errReqField")),
          level: Yup.string().required(t("errReqField")),
          description: Yup.string().required(t("errReqField")),
        }),
      )
      .required(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IStudentFormInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "learning_languages" });

  const handleSubmitStudentProfile = (data: IStudentFormInformation) => {
    console.log(data);
  };

  const handleCountLanguage = (value: number) => {
    setCountOfLanguages(value);
  };

  const handleDeleteLanguage = (id: number) => {
    const language = initialValues.learning_languages.find((_, ind) => ind === id);
    if (language) {
      console.log("logic for deleting real language");
    } else {
      setCountOfLanguages((value) => {
        return value - 1;
      });
      remove(id);
    }
  };

  return (
    <Box className="settingProfileStudentBox">
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
      <form onSubmit={handleSubmit(handleSubmitStudentProfile)}>
        <StudentInformation control={control} errors={errors} />
        <Button type="submit" className="submitButtonProfile">
          {t("saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default SettingProfileStudent;
