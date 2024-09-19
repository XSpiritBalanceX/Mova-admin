import { Box } from "@mui/material";
import { IStudentInformationProps } from "./TypesSettingProfileStudent";
import { translate } from "@i18n";
import { listOfCountries } from "@utils/listOfCountries";
import ControlledInput from "@components/fields/ControlledInput";
import ControlledSelect from "@components/fields/ControlledSelect";
import moment from "moment";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import "./SettingProfileStudent";

const StudentInformation = ({ control, errors }: IStudentInformationProps) => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const locale = useAppSelector(movaAdminSelectors.localeSelect);

  const firstLastName = [
    { label: "firstName", name: "user_information.first_name", error: errors.user_information?.first_name?.message },
    { label: "lastName", name: "user_information.last_name", error: errors.user_information?.first_name?.message },
  ];

  const currentYear = moment().year();

  const dateOfBirthFields = [
    {
      label: "day",
      name: "user_information.date_of_birthday.day",
      error: errors.user_information?.date_of_birthday?.day?.message,
      options: Array.from({ length: 31 }, (_, ind) => ({ id: (ind + 1).toString(), label: (ind + 1).toString() })),
    },
    {
      label: "month",
      name: "user_information.date_of_birthday.month",
      error: errors.user_information?.date_of_birthday?.month?.message,
      options: Array.from({ length: 12 }, (_, index) => ({
        id: String(index + 1).padStart(2, "0"),
        label: moment().month(index).format("MMMM"),
      })),
    },
    {
      label: "year",
      name: "user_information.date_of_birthday.year",
      error: errors.user_information?.date_of_birthday?.year?.message,
      options: Array.from({ length: 71 }, (_, ind) => {
        const year = currentYear - ind;
        return { id: year.toString(), label: year.toString() };
      }).filter((year) => Number(year.id) <= currentYear - 18 && Number(year.id) >= currentYear - 70),
    },
  ];

  const idAndEmailFields = [
    { label: "ID", name: "user_information.id", error: errors.user_information?.id?.message },
    { label: "E-mail", name: "user_information.email", error: errors.user_information?.email?.message },
  ];

  return (
    <Box className="studentInformationBox">
      <Box>
        {firstLastName.map((el, ind) => (
          <ControlledInput key={ind} control={control} name={el.name} error={el.error} placeholder={el.label} />
        ))}
      </Box>
      <Box className="itemInformation">
        <p className="nameOfItem">{t("dateOfBirth")}</p>
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
        <Box className="itemInformation">
          <p className="nameOfItem">{t("country")}</p>
          <ControlledSelect
            control={control}
            name="user_information.country"
            error={errors.user_information?.status?.message}
            placeholder={t("status")}
            options={listOfCountries.map((el) => {
              return { id: el.id.toString(), label: locale === "ru" ? el.russianLabel : el.englishLabel };
            })}
          />
        </Box>
        <Box className="itemInformation">
          <p className="nameOfItem">{t("status")}</p>
          <ControlledSelect
            control={control}
            name="user_information.status"
            error={errors.user_information?.status?.message}
            placeholder={t("status")}
            options={[
              { id: "0", label: t("student") },
              { id: "1", label: t("teacher") },
            ]}
          />
        </Box>
        {idAndEmailFields.map((el, ind) => (
          <Box key={ind} className="itemInformation">
            <p className="nameOfItem">{el.label}</p>
            <ControlledInput control={control} name={el.name} error={el.error} placeholder={el.label} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentInformation;
