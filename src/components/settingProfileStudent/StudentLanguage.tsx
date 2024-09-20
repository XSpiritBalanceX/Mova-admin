import { Box, Button, FormLabel, InputAdornment, TextField, FormHelperText } from "@mui/material";
import { IStudentLanguageProps, IStudentFormInformation } from "./TypesSettingProfileStudent";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import { translate } from "@i18n";
import ControlledSelect from "@components/fields/ControlledSelect";
import { language, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import BucketIcon from "@components/icons/BucketIcon";
import { Controller, Path, PathValue } from "react-hook-form";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import "./SettingProfileStudent.scss";

const StudentLanguage = ({ id, control, errors, watch, cbHandleDeleteLanguage }: IStudentLanguageProps) => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const locale = useAppSelector(movaAdminSelectors.localeSelect);

  const languageLevelFields = [
    {
      label: "learnLanguage",
      name: `learning_languages.${id}.language`,
      error: errors.learning_languages?.[id]?.language?.message,
      options: language[locale as keyof TLanguages].map((el, ind) => ({ id: ind.toString(), label: el })),
    },
    {
      label: "levelOfLang",
      name: `learning_languages.${id}.level`,
      error: errors.learning_languages?.[id]?.level?.message,
      options: level[locale as keyof TLevel].map((el, ind) => ({ id: ind.toString(), label: el })),
    },
  ];

  const handleDeleteLanguage = () => {
    cbHandleDeleteLanguage(id);
  };

  return (
    <Box className="studentLanguageRow">
      {languageLevelFields.map((el, ind) => (
        <Box key={ind} className="itemStudentLanguage">
          <FormLabel className={`labelLanguage ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledSelect
            control={control}
            name={el.name}
            error={el.error}
            placeholder={t(el.label)}
            options={el.options}
          />
        </Box>
      ))}
      <Box className="itemStudentLanguage">
        <FormLabel className={`labelLanguage ${errors?.learning_languages?.[id]?.description ? "errorLabel" : ""}`}>
          {t("goalLearn")}
        </FormLabel>
        <Controller
          name={`learning_languages.${id}.description` as Path<IStudentFormInformation>}
          control={control}
          defaultValue={"" as PathValue<IStudentFormInformation, Path<IStudentFormInformation>>}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                multiline
                rows={5}
                error={!!errors.learning_languages?.[id]?.description}
                placeholder={t("enterText")}
                className={`controlledField goalField`}
                InputProps={{
                  endAdornment: !!errors.learning_languages?.[id]?.description && (
                    <InputAdornment position="end" className="errorIcon">
                      <WarningAmberRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <FormHelperText className="errorMessage">
          {errors.learning_languages?.[id]?.description?.message}
        </FormHelperText>
      </Box>
      {watch("learning_languages" as Path<IStudentFormInformation>) && watch("learning_languages").length !== 1 && (
        <Box className="deleteLanguageBox">
          <Button type="button" onClick={handleDeleteLanguage}>
            <span>
              <BucketIcon fill="#C60202" />
            </span>
            {t("deleteLanguage")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StudentLanguage;
