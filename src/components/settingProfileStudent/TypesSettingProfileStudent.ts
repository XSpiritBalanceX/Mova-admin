import { Control, FieldErrors, UseFormWatch } from "react-hook-form";

export type TStudentInformation = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birthday: { day: string; month: string; year: string };
  email: string;
  country: string;
  status: string;
};

export type TStudentLanguage = {
  id?: number;
  language: string;
  level: string;
  description: string;
};

export interface IStudentFormInformation {
  user_information: TStudentInformation;
  learning_languages: TStudentLanguage[];
}

export interface IStudentInformationProps {
  control: Control<IStudentFormInformation>;
  errors: FieldErrors<IStudentFormInformation>;
}
