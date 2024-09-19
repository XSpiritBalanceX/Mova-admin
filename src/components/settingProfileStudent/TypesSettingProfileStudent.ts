export type TStudentInformation = {
  first_name: string;
  last_name: string;
  date_of_birthday: { day: string; month: string; year: string };
  email: string;
  country: string;
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
