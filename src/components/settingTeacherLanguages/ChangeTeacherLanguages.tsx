import { useState, useEffect } from "react";
import { Box, FormLabel, Button, TextField, InputAdornment } from "@mui/material";
import { language, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import { IChangeTeacherLanguagesProps, ITeacherLanguageSettings } from "./TypesSettingLanguages";
import { translate } from "@i18n";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import AddIcon from "@mui/icons-material/Add";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledSelect from "@components/fields/ControlledSelect";
import BucketIcon from "@components/icons/BucketIcon";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CertificatesLanguage from "./CertificatesLanguage";
import "./SettingTeacherLanguages.scss";

const ChangeTeacherLanguages = ({ languages }: IChangeTeacherLanguagesProps) => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const locale = useAppSelector(movaAdminSelectors.localeSelect);

  const [initialValues, setInitialValues] = useState<ITeacherLanguageSettings>({
    teaching_languages: [
      {
        language: "",
        level: "",
        description: "",
        price: 0,
        certificate: [],
      },
    ],
  });
  const [countOfLanguages, setCountOfLanguages] = useState<number>(initialValues.teaching_languages.length || 1);

  useEffect(() => {
    const completedData = languages.map((el) => {
      return {
        id: el.id,
        language: el.language.toString(),
        level: el.level.toString(),
        description: el.description,
        price: el.price,
        certificate: el.files,
      };
    });
    setInitialValues({ teaching_languages: completedData });
    setCountOfLanguages(completedData.length);
    // eslint-disable-next-line
  }, [languages]);

  const validationSchema = Yup.object().shape({
    teaching_languages: Yup.array()
      .of(
        Yup.object({
          id: Yup.number(),
          language: Yup.string().required(t("errReqField")),
          level: Yup.string().required(t("errReqField")),
          description: Yup.string().required(t("errReqField")),
          price: Yup.number().required(t("errReqField")).typeError(t("errReqField")),
          certificate: Yup.mixed<(File | { id: number; file: string })[]>().default([]).required(),
        }),
      )
      .required(),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ITeacherLanguageSettings>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "teaching_languages" });

  const submitTeacherLanguages = (data: ITeacherLanguageSettings) => {
    console.log(data);
  };

  const handleIncreaseRow = () => {
    setCountOfLanguages((value) => {
      return value + 1;
    });
  };

  const handleDeleteLanguage = (id: number) => {
    const language = initialValues.teaching_languages.find((_, ind) => ind === id);
    if (language) {
      console.log("logic for deleting real language");
    } else {
      setCountOfLanguages((value) => {
        return value - 1;
      });
      remove(id);
      clearErrors(`teaching_languages.${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitTeacherLanguages)} className="formTeacherLanguages">
      {Array(countOfLanguages)
        .fill(null)
        .map((_, ind) => (
          <Box key={["TeacherLanguageRow", ind].join("_")} className="teacherLanguageRow">
            <Box className="itemTeacherLanguage">
              <FormLabel className={`labelLanguage ${errors.teaching_languages?.[ind]?.language ? "errorLabel" : ""}`}>
                {t("teachLanguage")}
              </FormLabel>
              <ControlledSelect
                control={control}
                name={`teaching_languages.${ind}.language`}
                error={errors.teaching_languages?.[ind]?.language?.message}
                placeholder={t("teachLanguage")}
                options={language[locale as keyof TLanguages].map((el, ind) => ({ id: ind.toString(), label: el }))}
              />
            </Box>
            <Box className="itemTeacherLanguage">
              <FormLabel className={`labelLanguage ${errors.teaching_languages?.[ind]?.level ? "errorLabel" : ""}`}>
                {t("levelOfLang")}
              </FormLabel>
              <ControlledSelect
                control={control}
                name={`teaching_languages.${ind}.level`}
                error={errors.teaching_languages?.[ind]?.level?.message}
                placeholder={t("levelOfLang")}
                options={level[locale as keyof TLevel].map((el, ind) => ({ id: ind.toString(), label: el }))}
              />
            </Box>
            <Box className="itemTeacherLanguage">
              <FormLabel className={`labelLanguage ${errors.teaching_languages?.[ind]?.price ? "errorLabel" : ""}`}>
                {t("coast")}
              </FormLabel>
              <ControlledInput
                control={control}
                name={`teaching_languages.${ind}.price`}
                error={errors.teaching_languages?.[ind]?.price?.message}
                placeholder={t("coast")}
              />
            </Box>
            <CertificatesLanguage id={ind} watch={watch} setValue={setValue} />
            <Box className="itemTeacherLanguage">
              <FormLabel
                className={`labelLanguage ${errors.teaching_languages?.[ind]?.description ? "errorLabel" : ""}`}
              >
                {t("profSkills")}
              </FormLabel>
              <Controller
                name={`teaching_languages.${ind}.description`}
                control={control}
                defaultValue={""}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      multiline
                      rows={5}
                      error={!!errors.teaching_languages?.[ind]?.description}
                      placeholder={t("enterText")}
                      className={`controlledField skillField`}
                      InputProps={{
                        endAdornment: !!errors.teaching_languages?.[ind]?.description && (
                          <InputAdornment position="end" className="errorIcon">
                            <WarningAmberRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
              />
            </Box>
            {watch("teaching_languages") && watch("teaching_languages").length !== 1 && (
              <Box className="deleteLanguageBox">
                <Button type="button" onClick={() => handleDeleteLanguage(ind)}>
                  <span>
                    <BucketIcon fill="#C60202" />
                  </span>
                  {t("deleteLanguage")}
                </Button>
              </Box>
            )}
          </Box>
        ))}
      <Button type="button" onClick={handleIncreaseRow} className="addLanguageButton">
        <span>
          <AddIcon />
        </span>
        {t("addLanguageTeach")}
      </Button>
      <Box className="submitButtonBox">
        <Button type="submit">{t("saveChanges")}</Button>
      </Box>
    </form>
  );
};

export default ChangeTeacherLanguages;
