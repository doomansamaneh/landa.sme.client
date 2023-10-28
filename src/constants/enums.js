export const statusOptions = [
  {
    label: "دائم",
    value: "1"
  },
  {
    label: "موقت",
    value: "2"
  },
  {
    label: "ابطال شده",
    value: "3"
  }
]

export const dateRange = {
  // all: 0,
  // today: 2,
  // thisWeek: 3,
  // thisMonth: 4
  all: 0,
  today: 'today',
  thisWeek: 'thisWeek',
  thisMonth: 'thisMonth'
}

export const sqlOperator = {
  equal: 1,
  notEqual: 2,
  like: 3,
  notLike: 4,
  lessThan: 5,
  lessThanOrEqual: 6,
  greaterThan: 7,
  greaterThanOrEqual: 8,
  in: 9,
  notIn: 10,
  startWith: 11,
  isNull: 12,
  isNotNull: 13
}

export const cultures = [
  { code: "fa-IR", name: "فارسی", calendar: "persian", dir: "rtl", quasarLang: "fa-IR", flag: "" },
  { code: "ar", name: "العربیة", calendar: "hijri", dir: "rtl", quasarLang: "ar", flag: "" },
  { code: "en", name: "English", calendar: "gregorian", dir: "ltr", quasarLang: "en-US", flag: "" }
]
