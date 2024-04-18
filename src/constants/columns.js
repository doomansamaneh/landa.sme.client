export const code = {
  name: "code",
  field: "code",
  sortable: true,
  label: "کد",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const title = {
  name: "title",
  field: "title",
  sortable: true,
  label: "عنوان",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const isActive = {
  name: "isActive",
  field: "isActive",
  sortable: true,
  label: "فعال",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: true,
};

export const no = {
  name: "no",
  field: "no",
  sortable: true,
  label: "شماره",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:100px;",
  showFilter: true,
  //operator: sqlOperator.equal,
  value: "",
};

export const date = {
  name: "date",
  field: "date",
  template: "{{dateString}}",
  sortable: true,
  label: "تاریخ",
  class: "text-left",
  style: "width:100px",
  showFilter: true,
};

export const customerName = {
  name: "customerName",
  field: "customerName",
  sortable: true,
  label: "مشتری",
  style: "",
  template: "{{customerCode}} {{customerName}}",
  showFilter: true,
  class: "text-left",
  value: "",
};

export const subject = {
  name: "subject",
  field: "subject",
  sortable: true,
  label: "شرح",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const amount = {
  name: "amount",
  field: "amount",
  sortable: true,
  label: "جمع کل",
  align: "left",
  class: "text-left",
  showFilter: true,
  style: "width:120px",
};

export const payedAmount = {
  name: "payedAmount",
  field: "payedAmount",
  sortable: true,
  label: "دریافت شده",
  align: "left",
  class: "text-left",
  style: "width:120px",
  showFilter: true,
};

export const remainedAmount = {
  name: "remainedAmount",
  field: "remainedAmount",
  sortable: true,
  label: "مانده",
  align: "left",
  class: "text-left",
  style: "width:120px",
  showFilter: true,
};

export const discountAmount = {
  name: "discountAmount",
  field: "discountAmount",
  sortable: true,
  label: "تخفیف",
  align: "left",
  class: "text-left",
  style: "width:120px",
  showFilter: true,
};

export const actions = {
  name: "actions",
  field: "",
  sortable: false,
  label: "",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};
