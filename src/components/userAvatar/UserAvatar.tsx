import { useState } from "react";
import { Box, Button, Avatar, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import { toast } from "react-toastify";
import "./UserAvatar.scss";

interface IUserAvatarProps {
  photo?: null | string;
  first_name?: string;
  last_name?: string;
}

const UserAvatar = ({ photo, first_name, last_name }: IUserAvatarProps) => {
  const { t } = translate("translate", { keyPrefix: "userAvatar" });

  const [picture, setPicture] = useState<File | null>(null);
  const [errPicture, setErrPicture] = useState("");

  const handleCheckPhoto = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file.size >= 2097152) {
      setErrPicture(t("errorFileSizeImage"));
      return false;
    } else if (!allowedTypes.includes(file.type)) {
      setErrPicture(t("errorTypeImage"));
      return false;
    } else {
      setErrPicture("");
    }
    return true;
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const newPhoto = files && files[0];
    if (newPhoto) {
      const isValid = handleCheckPhoto(newPhoto);
      isValid && handleSentPhoto(newPhoto);
    }
  };

  const handleSentPhoto = async (photo: File) => {
    const formData = new FormData();
    formData.append("photo", photo);
    //TODO: logic for uploading photo to server
  };

  const handleDeleteAvatar = () => {
    setErrPicture("");
    setPicture(null);
  };

  return (
    <Box className="avatarBox">
      {!picture &&
        (photo ? (
          <Avatar src={photo} className="userAvatar" />
        ) : (
          <Box className="emptyAvatar">{`${first_name?.charAt(0)}${last_name?.charAt(0)}`}</Box>
        ))}
      {picture && <Avatar src={URL.createObjectURL(picture)} className="userAvatar" />}
      <Box className="controlsAvatarBox">
        <Box className="avatarButtonsBox">
          <label htmlFor="file_input" className="uploadAvatar">
            {t("upload")}
          </label>
          <input type="file" id="file_input" style={{ display: "none" }} onChange={handleUploadPhoto} />
          <Button type="button" className="deleteAvatar" onClick={handleDeleteAvatar}>
            {t("delete")}
          </Button>
        </Box>
      </Box>
      <Box className="hintErrBox">
        <p className="hintText">{t("hintPhoto")}</p>
        <FormHelperText className="errorMessage">{errPicture}</FormHelperText>
      </Box>
    </Box>
  );
};

export default UserAvatar;
