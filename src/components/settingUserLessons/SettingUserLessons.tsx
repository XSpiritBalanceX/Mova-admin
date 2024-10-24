import { useState } from "react";
import { Box } from "@mui/material";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import CardLesson from "./CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import LessonsNavigation from "./LessonsNavigation";
import CustomPagination from "@components/pagination/CustomPagination";
import "./SettingUserLessons.scss";

const mockData = {
  all_items_count: 6,
  page: 1,
  items: {
    upcoming: [
      {
        id: 1,
        schedule_id: 12,
        teacher_id: 1,
        first_name: "Mary",
        last_name: "Fisher",
        photo: null,
        date: "2024-09-28",
        time_start: "13:00",
        time_end: "13:50",
        status: "paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 2,
        schedule_id: 12,
        teacher_id: 1,
        first_name: "Andy",
        last_name: "Mitchel",
        photo: null,
        date: "2024-09-28",
        time_start: "13:00",
        time_end: "13:50",
        status: "not paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 3,
        schedule_id: 13,
        teacher_id: 1,
        first_name: "Ann",
        last_name: "Tooth",
        photo: null,
        date: "2024-09-26",
        time_start: "10:00",
        time_end: "10:50",
        status: "not paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 4,
        schedule_id: 6,
        teacher_id: 1,
        first_name: "Angel",
        last_name: "Darklin",
        photo: null,
        date: "2024-09-26",
        time_start: "12:00",
        time_end: "12:50",
        status: "paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 5,
        schedule_id: 15,
        teacher_id: 1,
        first_name: "Kate",
        last_name: "Bush",
        photo: null,
        date: "2024-09-27",
        time_start: "18:00",
        time_end: "18:50",
        status: "paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
    ],
    past: [],
    canceled: [
      {
        id: 5,
        schedule_id: 16,
        teacher_id: 1,
        first_name: "Fill",
        last_name: "Smith",
        photo: null,
        date: "2024-09-28",
        time_start: "19:00",
        time_end: "19:50",
        status: "not paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 6,
        schedule_id: 12,
        teacher_id: 1,
        first_name: "Andy",
        last_name: "Mitchel",
        photo: null,
        date: "2024-09-28",
        time_start: "13:00",
        time_end: "13:50",
        status: "not paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 7,
        schedule_id: 13,
        teacher_id: 1,
        first_name: "Ann",
        last_name: "Tooth",
        photo: null,
        date: "2024-09-26",
        time_start: "10:00",
        time_end: "10:50",
        status: "not paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 8,
        schedule_id: 6,
        teacher_id: 1,
        first_name: "Angel",
        last_name: "Darklin",
        photo: null,
        date: "2024-09-26",
        time_start: "12:00",
        time_end: "12:50",
        status: "paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
      {
        id: 9,
        schedule_id: 15,
        teacher_id: 1,
        first_name: "Kate",
        last_name: "Bush",
        photo: null,
        date: "2024-09-27",
        time_start: "18:00",
        time_end: "18:50",
        status: "paid",
        theme: "Effective Negotiation Techniques in Business",
        reason: "Технические неполадки",
      },
    ],
  },
};

export interface ILesson {
  id: number;
  schedule_id: number;
  teacher_id?: number;
  student_id?: number;
  first_name: string;
  last_name: string;
  photo: string | null;
  date: string;
  time_start: string;
  time_end: string;
  status: string;
  theme: string;
  reason: string;
}

enum LessonType {
  Upcoming = "upcoming",
  Past = "past",
  Canceled = "canceled",
}

const SettingUserLessons = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserLessons" });

  const { user_id, page, lesson_type } = useParams() as { user_id: string; page: string; lesson_type: LessonType };

  const [itemPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    selectedLesson && setSelectedLesson(null);
  };

  const handleShowModal = (id: number) => {
    const lesson = mockData.items.upcoming.find((el) => el.id === id);
    if (lesson) {
      setIsOpenModal(true);
      setSelectedLesson(lesson);
    }
  };

  return (
    <>
      {selectedLesson && (
        <ModalCancelLesson isOpen={isOpenModal} cbCloseModal={handleCloseModal} lesson={selectedLesson} />
      )}
      <LessonsNavigation />
      <Box className="userLessonsBox">
        {mockData.items[lesson_type].length === 0 && (
          <Box className="emptyDataBox">
            {lesson_type === LessonType.Upcoming && <p>{t("noOneUpcomingLessons")}</p>}
            {lesson_type === LessonType.Past && <p>{t("noOnePastLessons")}</p>}
            {lesson_type === LessonType.Canceled && <p>{t("noOneCanceledLessons")}</p>}
          </Box>
        )}
        {mockData.items[lesson_type].length !== 0 && (
          <Box className="lessonsCardBox">
            {mockData.items[lesson_type].map((el, ind) => (
              <CardLesson key={ind} lesson_information={el} cbShowModal={handleShowModal} />
            ))}
            <CustomPagination
              count={mockData.all_items_count}
              itemsPerPage={itemPerPage}
              urlPage={`/user/${user_id}/lessons/${lesson_type}`}
              activePage={page as string}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SettingUserLessons;
