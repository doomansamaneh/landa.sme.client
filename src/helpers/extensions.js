function getIso() {
  return localStorage.getItem("selectedLanguage") ?? "fa-IR";
}

Date.prototype.toDateString = function () {
  const date = new Date(this.valueOf());
  const fullDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    numberingSystem: "latn",
  };
  return date.toLocaleDateString(getIso(), fullDate);
};

Date.prototype.toDateTimeString = function () {
  const date = new Date(this.valueOf());
  const fullDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date?.toLocaleDateString(getIso(), fullDate);
};

Date.prototype.toDayString = function () {
  const date = new Date(this.valueOf());
  const fullDate = {
    weekday: "long",
  };
  return date.toLocaleDateString(getIso(), fullDate);
};
