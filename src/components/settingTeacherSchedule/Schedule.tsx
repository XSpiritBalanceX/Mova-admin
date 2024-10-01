import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import * as momentTimeZone from "moment-timezone";
import moment from "moment";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import { translate } from "@i18n";
import ButtonTime from "./ButtonTime";
import { useParams } from "react-router-dom";
import "./SettingTeachSchedule.scss";

const mockData = [
  {
    id: 1,
    day: 0,
    time_start: "13:00",
    time_end: "13:50",
  },
  {
    id: 2,
    day: 3,
    time_start: "13:00",
    time_end: "13:50",
  },
  {
    id: 3,
    day: 5,
    time_start: "18:00",
    time_end: "18:50",
  },
  {
    id: 4,
    day: 2,
    time_start: "10:00",
    time_end: "10:50",
  },
];

type TLesson = {
  id?: number | null;
  day: number;
  time_start: string;
  time_end: string;
};

const Schedule = () => {
  const { t } = translate("translate", { keyPrefix: "settingTeacherSchedule" });

  const { type } = useParams();

  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [schedule, setSchedule] = useState<TLesson[]>([]);
  const [deleteLessonID, setDeleteLessonID] = useState<number[]>([]);

  useEffect(() => {
    if (mockData) {
      setSchedule(mockData);
    }
    // eslint-disable-next-line
  }, [mockData]);

  const handleChangeTimeZone = (timezone: ITimezoneOption) => {
    setSelectedTimeZone(timezone.value);
    momentTimeZone.tz.setDefault(timezone.value);
  };

  const getTimeInDay = (from: number, to: number) => {
    const scheduleTime: Array<string> = [];
    const startTime = moment({ hour: from, minute: 0 });
    const endTime = moment({ hour: to, minute: 0 });
    scheduleTime.push(startTime.format("HH:mm"));
    while (startTime.isBefore(endTime)) {
      scheduleTime.push(startTime.add(60, "minutes").format("HH:mm"));
    }
    return scheduleTime;
  };

  const handleCreateSchedule = (time: string, day: string) => {
    const foundLesson =
      mockData &&
      mockData.find((el) => el.day === Number(day) && el.time_start === moment(time, "HH:mm").utc().format("HH:mm"));
    const lesson = {
      id: foundLesson?.id ?? null,
      day: Number(day),
      time_start: moment(time, "HH:mm").utc().format("HH:mm"),
      time_end: moment(time, "HH:mm").utc().add(55, "minutes").format("HH:mm"),
    };
    const copyData = schedule.slice();
    const index = copyData.findIndex(
      (el) => el.day === lesson.day && el.time_start === lesson.time_start && el.time_end === lesson.time_end,
    );
    if (index !== -1) {
      const lessonId = copyData[index];
      const copyLessonsID = deleteLessonID.slice();
      lessonId.id && !copyLessonsID.includes(lessonId.id) && copyLessonsID.push(lessonId.id);
      setDeleteLessonID(copyLessonsID);
      copyData.splice(index, 1);
    } else {
      const foundID = mockData && mockData.find((el) => el.day === lesson.day && el.time_start === lesson.time_start);
      const filteredLessonIDs = foundID && deleteLessonID.filter((el) => el !== foundID.id);
      filteredLessonIDs && setDeleteLessonID(filteredLessonIDs);
      copyData.push(lesson);
    }
    setSchedule(copyData);
  };

  const handleSentSchedule = () => {
    console.log("schedule", schedule);
    console.log("deleted lessons", deleteLessonID);
  };

  return (
    <Box className="scheduleBox">
      <p className="titleSchedule">{t("scheduleLessons")}</p>
      <p className="durationLesson">{t("lessonDuration")}</p>
      <Box className="timeZoneBox">
        <p>{t("chooseTimeZone")}</p>
        <TimezoneSelect value={selectedTimeZone} onChange={handleChangeTimeZone} className="timeZoneField" />
      </Box>
      <Box className="daysTimeContainer">
        <Box className="daysBox">
          {Array(7)
            .fill(null)
            .map((_, ind) => (
              <Box key={ind} className="dayBox">
                {moment().weekday(ind).format("ddd").toLowerCase()}
              </Box>
            ))}
        </Box>
        <Box className="timeBox">
          {Array(7)
            .fill(null)
            .map((_, ind) => (
              <Box key={ind}>
                {getTimeInDay(0, 23).map((el, index) => (
                  <ButtonTime
                    key={index}
                    time={el}
                    day={ind}
                    cbHandleCreateSchedule={handleCreateSchedule}
                    schedule={schedule}
                  />
                ))}
              </Box>
            ))}
        </Box>
      </Box>
      {type === "schedule_change" && (
        <Box className="saveScheduleButtonBox">
          <Button type="button" onClick={handleSentSchedule}>
            {t("saveChanges")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Schedule;
