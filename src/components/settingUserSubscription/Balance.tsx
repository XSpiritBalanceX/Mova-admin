import { useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { translate } from "@i18n";
import "./SettingUserSubscription.scss";

const Balance = () => {
  const { t } = translate("translate", { keyPrefix: "settingUserSubscription" });

  const isStudent = localStorage.getItem("mova_admin_user_type") === "0";

  const [currentCurrency, setCurrentCurrency] = useState("$");
  const [money, setMoney] = useState<string | number>("");
  const [currentSum, setCurrentSum] = useState("");
  const [isChangeBalance, setIsChangeBalance] = useState(true);

  const currency = [
    { label: "USD", value: "$" },
    { label: "BYN", value: "Br" },
  ];

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCurrency(e.target.value);
  };

  const handleChangeSum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (Number(value)) {
      setCurrentSum(value);
    } else if (value === "") {
      setCurrentSum("");
    }
  };

  const handleWithdrawMoney = () => {
    const sum = Number(currentSum) + Number(money);
    setMoney(sum);
    setCurrentSum("");
  };

  const handleChangeBalance = () => {
    setIsChangeBalance(!isChangeBalance);
  };

  return (
    <Box className="balanceBox">
      <p className="balanceTitle">{t("balance")}</p>
      <Box className="balanceCurrencyBox">
        <TextField
          placeholder={t("sum")}
          value={currentSum}
          onChange={handleChangeSum}
          className="balanceField"
          disabled={isChangeBalance}
        />
        <TextField
          select={true}
          value={currentCurrency}
          onChange={handleChangeCurrency}
          className="currencyField"
          disabled={isChangeBalance}
        >
          {currency.map((el, ind) => (
            <MenuItem key={ind} value={el.value}>
              {el.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box className="balanceControlsBox">
        <Button type="button" className="depositButton" onClick={handleWithdrawMoney}>
          {isStudent ? t("deposit") : t("withdraw")}
        </Button>
        <Button type="button" className="changButton" onClick={handleChangeBalance}>
          {isChangeBalance ? t("change") : "OK"}
        </Button>
      </Box>
    </Box>
  );
};

export default Balance;
