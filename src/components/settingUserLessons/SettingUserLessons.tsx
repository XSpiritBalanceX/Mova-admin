import { useState, useEffect } from "react";
import { Box, Pagination } from "@mui/material";
import { translate } from "@i18n";
import { useNavigate, useParams } from "react-router-dom";
import CardLesson from "./CardLesson";
import ModalCancelLesson from "@components/modal/ModalCancelLesson";
import LessonsNavigation from "./LessonsNavigation";
import "./SettingUserLessons.scss";

const mockData = {
  all_items_count: 6,
  count: 5,
  page: 1,
  items: [
    {
      id: 1,
      schedule_id: 12,
      teacher_id: 1,
      teacher_first_name: "Mary",
      teacher_last_name: "Fisher",
      photo: null,
      date: "2024-09-28",
      time_start: "13:00",
      time_end: "13:50",
      status: "paid",
    },
    {
      id: 1,
      schedule_id: 12,
      teacher_id: 1,
      teacher_first_name: "Andy",
      teacher_last_name: "Mitchel",
      photo: null,
      date: "2024-09-28",
      time_start: "13:00",
      time_end: "13:50",
      status: "not paid",
    },
    {
      id: 2,
      schedule_id: 13,
      teacher_id: 1,
      teacher_first_name: "Ann",
      teacher_last_name: "Tooth",
      photo: null,
      date: "2024-09-26",
      time_start: "10:00",
      time_end: "10:50",
      status: "not paid",
    },
    {
      id: 3,
      schedule_id: 6,
      teacher_id: 1,
      teacher_first_name: "Angel",
      teacher_last_name: "Darklin",
      photo: null,
      date: "2024-09-26",
      time_start: "12:00",
      time_end: "12:50",
      status: "paid",
    },
    {
      id: 4,
      schedule_id: 15,
      teacher_id: 1,
      teacher_first_name: "Kate",
      teacher_last_name: "Bush",
      photo: null,
      date: "2024-09-27",
      time_start: "18:00",
      time_end: "18:50",
      status: "paid",
    },
    {
      id: 5,
      schedule_id: 16,
      teacher_id: 1,
      teacher_first_name: "Fill",
      teacher_last_name: "Smith",
      photo: null,
      date: "2024-09-28",
      time_start: "19:00",
      time_end: "19:50",
      status: "not paid",
    },
  ],
};

export interface ILesson {
  id: number;
  schedule_id: number;
  teacher_id: number;
  teacher_first_name: string;
  teacher_last_name: string;
  photo: string | null;
  date: string;
  time_start: string;
  time_end: string;
  status: string;
}

const SettingUserLessons = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserLessons" });

  const { user_id, page } = useParams();
  const navigate = useNavigate();

  const [itemPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const [pagesPagination, setPagesPagination] = useState(0);

  const isStudent = localStorage.getItem("mova_admin_user_type") === "0";

  useEffect(() => {
    if (mockData) {
      const pages = Math.ceil(mockData.all_items_count / itemPerPage);
      pages > 1 && setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [mockData]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/user/${user_id}/lessons_${value}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    selectedLesson && setSelectedLesson(null);
  };

  const handleShowModal = (id: number) => {
    const lesson = mockData.items.find((el) => el.id === id);
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
        {mockData.items.length === 0 && (
          <Box className="emptyDataBox">
            <p>{t(isStudent ? "noOneLessons" : "noOneLessonsTeacher")}</p>
          </Box>
        )}
        {mockData.items.length !== 0 && (
          <Box className="lessonsCardBox">
            <p className="titleLessons">{t("upcomingLessons")}</p>
            {mockData.items.map((el, ind) => (
              <CardLesson key={ind} lesson_information={el} cbShowModal={handleShowModal} />
            ))}
          </Box>
        )}
        {pagesPagination > 0 && (
          <Box className="paginationBox">
            <Pagination
              count={pagesPagination}
              page={Number(page)}
              onChange={handleChangePage}
              className="searchPagination"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SettingUserLessons;
