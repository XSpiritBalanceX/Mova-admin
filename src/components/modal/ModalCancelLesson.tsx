import { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./Modal.scss";

interface ILesson {
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
}

interface IModalCancelLessonProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  lesson: ILesson;
}

const ModalCancelLesson = ({ isOpen, cbCloseModal, lesson }: IModalCancelLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "settingUserLessons" });

  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    cbCloseModal();
  };

  const handleChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.currentTarget.value);
    setErrorMessage("");
  };

  const handleSendReason = () => {
    if (!reason) {
      setErrorMessage(t("errorReason"));
    } else {
      console.log(lesson.id, reason);
    }
  };

  return (
    <Modal open={isOpen} className="modalCancelLessons">
      <Box className="contentCancelLessons">
        <Box className="closeButtonBox">
          <Button type="button" onClick={handleCloseModal}>
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box className="mainContentBox">
          <p className="titleModal">{t("cancellingLesson")}</p>
          <p className="reasonModal">{t("reason")}</p>
          <textarea
            value={reason}
            onChange={handleChangeReason}
            placeholder={t("enterText")}
            rows={4}
            maxLength={512}
            className="fieldReason"
          />
          <p className="errorMessage">{errorMessage}</p>
          <Box className="controlsModalBox">
            <Button type="button" onClick={handleSendReason} className="cancelButton">
              {t("cancelLesson")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCancelLesson;
