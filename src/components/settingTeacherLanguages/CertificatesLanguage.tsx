import { useState, useEffect } from "react";
import { Box, Button, FormHelperText } from "@mui/material";
import { ICertificatesLanguageProps } from "./TypesSettingLanguages";
import { translate } from "@i18n";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "./SettingTeacherLanguages.scss";

const CertificatesLanguage = ({ id, watch, setValue }: ICertificatesLanguageProps) => {
  const { t } = translate("translate", { keyPrefix: "settingProfileUser" });

  const currentCertificates = watch(`teaching_languages.${id}.certificate`);

  const [certificates, setCertificates] = useState<(File | { id: number; file: string })[]>([]);
  const [certificateError, setCertificateError] = useState("");
  const [size, setSize] = useState<{ element: string; size: string }[]>([]);

  useEffect(() => {
    if (currentCertificates) {
      setCertificates(currentCertificates);
    }
    // eslint-disable-next-line
  }, [currentCertificates]);

  const convertSize = (value: number) => {
    const kbInMb = 1024;
    return (value / kbInMb / kbInMb).toFixed(2);
  };

  const handleCheckCertificate = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (file.size >= 2097152) {
      setCertificateError(t("errorFileSizeImage"));
      return false;
    } else if (!allowedTypes.includes(file.type)) {
      setCertificateError(t("errorTypeImage"));
      return false;
    } else {
      setCertificateError("");
    }
    return true;
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const newCertificate = files && files[0];
    if (newCertificate) {
      const isValid = handleCheckCertificate(newCertificate);
      const copyData = certificates.slice();
      copyData.push(newCertificate);
      if (isValid) {
        setCertificates(copyData);
        setValue(`teaching_languages.${id}.certificate`, copyData);
      }
    }
  };

  const handleDeletePhoto = async (ind: number) => {
    const copyData = certificates.slice();
    const foundFile = copyData[ind];
    if (foundFile instanceof File) {
      copyData.splice(ind, 1);
      setCertificates(copyData);
      setValue(`teaching_languages.${id}.certificate`, copyData);
    } else {
      console.log("real logic for deleting file");
    }
  };

  const countOfFiles = certificates.filter((item) => {
    if (item instanceof File) {
      return true;
    } else if (typeof item === "object" && item !== null) {
      return Object.keys(item).length > 0 && "id" in item && "file" in item;
    } else {
      return false;
    }
  }).length;

  return (
    <Box className="certificateBox">
      <p className="certificateTitle">{t("certificates")}</p>
      {certificates.map((el, ind) => {
        return el instanceof File ? (
          <Box key={ind} className="certificateItemBox">
            <img src={URL.createObjectURL(el)} alt="certificate" />
            <Box className="certificateNameSizeBox">
              <p className="certificateName">{el.name}</p>
              <p className="certificateSize">{convertSize(el.size)} MB</p>
            </Box>
            <Button type="button" onClick={() => handleDeletePhoto(ind)} className="deleteCertificateButton">
              <CloseIcon />
            </Button>
          </Box>
        ) : "file" in el ? (
          <Box key={ind} className="certificateItemBox">
            <img src={el.file} alt="certificate" />
            <Box className="certificateNameSizeBox">
              {/* <p className="certificateName">
                {el.file && new URL(el.file).pathname.split("%3B")[2].replace(/.{19}(?=\.png|.jpg)/, "")}
              </p> */}
              {/* <p className="certificateSize">
                {!loadingSizeFile && size.find((file) => file.element === el.file)?.size} MB
              </p> */}
            </Box>
            <Button type="button" onClick={() => handleDeletePhoto(ind)} className="deleteCertificateButton">
              <CloseIcon />
            </Button>
          </Box>
        ) : null;
      })}
      <FormHelperText className="errorMessage">{certificateError}</FormHelperText>
      {countOfFiles < 5 && (
        <Box className="addCertificateBox">
          <label htmlFor={`file_input_${id}`} className="labelCertificate">
            <AddIcon />
          </label>
          <input type="file" id={`file_input_${id}`} style={{ display: "none" }} onChange={handleUploadPhoto} />
          <Box>
            <p>{t("hintCertificate1")}</p>
            <p>{t("hintCertificate2")}</p>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CertificatesLanguage;
