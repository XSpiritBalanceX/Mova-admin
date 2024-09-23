import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface ITeacherLanguage {
  id: number;
  language: number;
  level: number;
  price: number;
  description: string;
  files: { id: number; file: string }[];
}

export interface IChangeTeacherLanguagesProps {
  languages: ITeacherLanguage[];
}

type TTeacherLanguage = {
  id?: number;
  language: string;
  level: string;
  description: string;
  price: number;
  certificate: (File | { id: number; file: string })[];
};

export interface ITeacherLanguageSettings {
  teaching_languages: TTeacherLanguage[];
}

export interface ICertificatesLanguageProps {
  id: number;
  watch: UseFormWatch<ITeacherLanguageSettings>;
  setValue: UseFormSetValue<ITeacherLanguageSettings>;
}
