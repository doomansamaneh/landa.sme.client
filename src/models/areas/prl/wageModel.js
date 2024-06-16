import "src/helpers/extensions";
const dateTime = new Date();

export const wageModel = {
  month: 1,
  subject: "wage",
  date: dateTime.toDateString(),
  wageItems: [],
};
