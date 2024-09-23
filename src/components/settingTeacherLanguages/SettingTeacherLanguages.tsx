import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./SettingTeacherLanguages.scss";

const SettingTeacherLanguages = () => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const { user_id, type } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/user/${user_id}/${e.currentTarget.name}`);
  };

  return (
    <Box className="languagesSettingsBox">
      <Box className="buttonsNavigateBox">
        {type === "languages" ? (
          <Button type="button" name="languages_change" onClick={handleNavigate}>
            {t("change")}
          </Button>
        ) : (
          <Button type="button" name="languages" onClick={handleNavigate}>
            <ArrowBackIosNewIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SettingTeacherLanguages;
