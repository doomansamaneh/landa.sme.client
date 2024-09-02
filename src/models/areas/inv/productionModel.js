import "src/helpers/extensions";
const dateTime = new Date();

export const productionModel = {
  no: 1,
  date: dateTime.toDateString(),
  items: [],
  scrapItems: [],
  usedItems: [],
  costs: [],
};
