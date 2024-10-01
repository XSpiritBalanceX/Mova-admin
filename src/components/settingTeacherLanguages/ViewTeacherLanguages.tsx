import { Box } from "@mui/material";
import { ITeacherLanguage } from "./SettingTeacherLanguages";
import { language, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import { translate } from "@i18n";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import "./SettingTeacherLanguages.scss";

interface IViewTeacherLanguagesProps {
  languages: ITeacherLanguage[];
}

const ViewTeacherLanguages = ({ languages }: IViewTeacherLanguagesProps) => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const locale = useAppSelector(movaAdminSelectors.localeSelect);

  return (
    <Box>
      {languages.map((el, ind) => (
        <Box key={ind} className="viewLanguageItem">
          <Box className="languageInformationBox">
            <p className="titleText">{t("teachLanguage")} </p>
            <p className="dataText">{language[locale as keyof TLanguages][el.language]}</p>
          </Box>
          <Box className="languageInformationBox">
            <p className="titleText">{t("levelOfLang")} </p>
            <p className="dataText">{level[locale as keyof TLevel][el.level]}</p>
          </Box>
          <Box className="languageInformationBox">
            <p className="titleText">{t("coast")} </p>
            <p className="dataText">{el.price}</p>
          </Box>
          <Box className="languageInformationBox certificatesItemBox">
            <p className="titleText">{t("certificates")}</p>
            <Box className="certificatesBox">
              {el.files.map((file, index) => (
                <Box key={index}>
                  <img src={file.file} alt="certificate" />
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="languageInformationBox">
            <p className="titleText">{t("profSkills")} </p>
            <p className="dataText">{el.description}</p>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ViewTeacherLanguages;
