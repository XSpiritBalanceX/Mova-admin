import { Modal, Button, Box, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import { InputMask } from "@react-input/mask";
import ControlledInput from "@components/fields/ControlledInput";
import "./Modal.scss";

interface IModalNewBankCardProps {
  isOpen: boolean;
  cbCloseModal: () => void;
}

interface INewCard {
  number_card: string;
  name_card: string;
  exp_date: string;
  cvc: string;
}

const ModalNewBankCard = ({ isOpen, cbCloseModal }: IModalNewBankCardProps) => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const handleCloseModal = () => {
    cbCloseModal();
  };

  const validationSchema = Yup.object().shape({
    number_card: Yup.string().required(t("errReqField")).min(19, t("errReqField")),
    name_card: Yup.string().required(t("errReqField")),
    exp_date: Yup.string()
      .required(t("errReqField"))
      .test("format", t("errValidityPeriod"), (value, ctx) => {
        const currentDate = moment();
        const valueDate = moment(`${value}`, "MM/YY");
        return valueDate.isAfter(currentDate) ? true : ctx.createError();
      }),
    cvc: Yup.string()
      .required(t("errReqField"))
      .min(3, t("errLengthCVC"))
      .max(3, t("errLengthCVC"))
      .matches(/^\d+$/, t("errNumber")),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<INewCard>({
    resolver: yupResolver(validationSchema),
  });

  const submitNewCard = (data: INewCard) => {
    console.log(data);
  };

  const handleChangeNumberCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue("number_card", value);
  };

  const handleChangeDateCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue("exp_date", value);
  };

  return (
    <Modal open={isOpen} className="modalAddNewCard">
      <Box className="contentAddNewCard">
        <Box className="closeButtonBox">
          <Button type="button" onClick={handleCloseModal}>
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box className="mainContentNewCard">
          <p className="titleNewCard">{t("addCard")}</p>
          <form onSubmit={handleSubmit(submitNewCard)} className="formAddNewCard">
            <Box className="newBankCardField">
              <InputMask
                mask="____ ____ ____ ____"
                replacement={{ _: /\d/ }}
                placeholder={t("numberOfCard")}
                className={`numberField ${errors.number_card ? "errorField" : ""}`}
                onChange={handleChangeNumberCard}
                value={watch("number_card") ?? ""}
              />
              <FormHelperText className="errorMessage">{errors.number_card?.message}</FormHelperText>
            </Box>
            <Box className="newBankCardField">
              <ControlledInput
                control={control}
                name="name_card"
                placeholder={t("name")}
                error={errors?.name_card?.message}
              />
            </Box>
            <Box className="doubledBox">
              <Box className="newBankCardField">
                <InputMask
                  mask="__/__"
                  replacement={{ _: /\d/ }}
                  placeholder={t("validityPeriod")}
                  className={`numberField ${errors.exp_date ? "errorField" : ""}`}
                  onChange={handleChangeDateCard}
                  value={watch("exp_date") ?? ""}
                />
                <FormHelperText className="errorMessage">{errors.exp_date?.message}</FormHelperText>
              </Box>
              <ControlledInput control={control} name="cvc" placeholder="***" error={errors?.cvc?.message} />
            </Box>
            <Button type="submit" className="submitNewCardButton">
              {t("add")}
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalNewBankCard;
