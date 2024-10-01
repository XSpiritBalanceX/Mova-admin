import { Box, TableRow, TableCell } from "@mui/material";
import { translate } from "@i18n";
import moment from "moment";
import "./PaymentsItem.scss";

interface IPaymentsItemProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  last_payment: string;
  payment_method: string;
}

const PaymentsItem = ({
  id,
  first_name,
  last_name,
  email,
  status,
  last_payment,
  payment_method,
}: IPaymentsItemProps) => {
  const { t } = translate("translate", { keyPrefix: "paymentsPage" });

  const currentDate = moment();

  return (
    <TableRow className="paymentItemRow">
      <TableCell>
        <Box className="paymentItemBox">{id}</Box>
      </TableCell>
      <TableCell>
        <Box className="paymentItemBox">{`${first_name} ${last_name}`}</Box>
      </TableCell>
      <TableCell>
        <Box className="paymentItemBox">{status === "0" ? t("student") : t("teacher")}</Box>
      </TableCell>
      <TableCell>
        <Box className="paymentItemBox">{email}</Box>
      </TableCell>
      <TableCell>
        <Box
          className={`paymentItemBox lastPaymentBox ${
            moment(last_payment).add(1, "months").isBefore(currentDate) ? "overduePayment" : "actualPayment"
          }`}
        >{`${moment(last_payment, "YYYY-MM-DD").format("DD.MM.YYYY")} ${t("subscriptionUpdateUntil", {
          date: moment(last_payment, "YYYY-MM-DD").add(1, "months").format("DD.MM.YYYY"),
        })}`}</Box>
      </TableCell>
      <TableCell>
        <Box className="paymentItemBox">{payment_method}</Box>
      </TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
