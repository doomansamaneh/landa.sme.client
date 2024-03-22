import { useCulture } from "src/composables/useCulture";
const cultureStore = useCulture();

Date.prototype.toDateString = function () {
  var date = new Date(this.valueOf());
  const fullDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    numberingSystem: "latn",
  };
  return date.toLocaleDateString(
    cultureStore.culture.value.quasarLang,
    fullDate
  );
};

Date.prototype.toDateTimeString = function () {
  var date = new Date(this.valueOf());
  const fullDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString(
    cultureStore.culture.value.quasarLang,
    fullDate
  );
};

Date.prototype.toDayString = function () {
  var date = new Date(this.valueOf());
  const weekday = {
    weekday: "long",
  };
  return date.toLocaleDateString(
    cultureStore.culture.value.quasarLang,
    weekday
  );
};
