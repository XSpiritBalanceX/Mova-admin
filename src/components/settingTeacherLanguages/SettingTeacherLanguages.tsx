import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import ViewTeacherLanguages from "./ViewTeacherLanguages";
import ChangeTeacherLanguages from "./ChangeTeacherLanguages";
import "./SettingTeacherLanguages.scss";

export interface ITeacherLanguage {
  id: number;
  language: number;
  level: number;
  price: number;
  description: string;
  files: { id: number; file: string }[];
}

const mockData: ITeacherLanguage[] = [
  {
    id: 1,
    language: 12,
    level: 4,
    price: 10,
    description:
      "Donec eget ornare mauris, eget interdum nulla. Praesent posuere, magna vel elementum pulvinar, sapien erat dapibus justo, quis eleifend nulla nunc ut est.",
    files: [
      {
        id: 1,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
      {
        id: 2,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
      {
        id: 3,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
      {
        id: 4,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
      {
        id: 5,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
    ],
  },
  {
    id: 2,
    language: 8,
    level: 2,
    price: 5,
    description: "Donec dolor tellus, laoreet a facilisis non",
    files: [
      {
        id: 1,
        file: "https://media.istockphoto.com/id/1453289203/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC-%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.jpg?s=612x612&w=0&k=20&c=YS3prthoQV4FVhBh9ZvNXC4P_OVTxpfnrZx-cppx8-s=",
      },
    ],
  },
];

const SettingTeacherLanguages = () => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const { user_id, type } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/user/${user_id}/${e.currentTarget.name}`);
  };

  return (
    <Box className="languagesSettingsBox">
      {type === "languages" && (
        <Box className={`buttonsNavigateBox languageChangeButton`}>
          <Button type="button" name="languages_change" onClick={handleNavigate}>
            {t("change")}
          </Button>
        </Box>
      )}
      {type === "languages_change" && (
        <Box className={`buttonsNavigateBox`}>
          <Button type="button" name="languages" onClick={handleNavigate}>
            <ArrowBackIosNewIcon />
          </Button>
        </Box>
      )}
      {type === "languages" && <ViewTeacherLanguages languages={mockData} />}
      {type === "languages_change" && <ChangeTeacherLanguages languages={mockData} />}
    </Box>
  );
};

export default SettingTeacherLanguages;
