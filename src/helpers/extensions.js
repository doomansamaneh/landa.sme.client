import { useCulture } from "src/composables/useCulture";

Date.prototype.toDateString = function () {
  const iso = localStorage.getItem("selectedLanguage");
  const date = new Date(this.valueOf());
  const fullDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    numberingSystem: "latn",
  };
  return date.toLocaleDateString(iso, fullDate);
};

Date.prototype.toDateTimeString = function () {
  const date = new Date(this.valueOf());
  const iso = localStorage.getItem("selectedLanguage");
  const fullDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString(iso, fullDate);
};

Date.prototype.toDayString = function () {
  const date = new Date(this.valueOf());
  const iso = localStorage.getItem("selectedLanguage");
  const weekday = {
    weekday: "long",
  };
  return date.toLocaleDateString(iso, weekday);
};
