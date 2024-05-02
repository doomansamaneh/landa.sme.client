import "src/helpers/extensions";
import { transferMoneyType } from "src/constants";

const dateTime = new Date();

export const transferMoneyModel = {
  amount: 0,
  fromFee: 0,
  toFee: 0,
  date: dateTime.toDateString(),
  fromSource: transferMoneyType.bankAccount,
  toSource: transferMoneyType.bankAccount,
};
