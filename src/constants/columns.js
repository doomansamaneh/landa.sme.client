export const id = {
  name: "id",
  field: "id",
  sortable: false,
  label: "نوع",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
};

export const type = {
  name: "typeId",
  field: "typeId",
  sortable: true,
  label: "نوع",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: true,
};

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

export const slCode = {
  name: "slCode",
  field: "slCode",
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

export const slTitle = {
  name: "slTitle",
  field: "slTitle",
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

export const comment = {
  name: "comment",
  field: "comment",
  sortable: true,
  label: "شرح",
  class: "text-left",
  showFilter: true,
};

export const rowNo = {
  name: "rowNo",
  field: "rowNo",
  sortable: true,
  label: "ش پیگیری",
  class: "text-left",
  style: "width:90px",
  showFilter: true,
};

export const voucherNo = {
  name: "voucherNo",
  field: "voucherNo",
  sortable: true,
  label: "ش سند",
  class: "text-left",
  style: "width:90px",
  showFilter: true,
};

export const voucherDate = {
  name: "voucherDate",
  field: "voucherDate",
  sortable: true,
  label: "تاریخ",
  class: "text-left",
  showFilter: true,
};

export const voucherSubject = {
  name: "voucherSubject",
  field: "voucherSubject",
  sortable: true,
  label: "موضوع",
  class: "text-left",
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
  label: "موضوع",
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

export const debit = {
  name: "debit",
  field: "debit",
  sortable: false,
  label: "مانده بدهکار",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const inlineDebit = {
  name: "inlineDebit",
  field: "inlineDebit",
  sortable: false,
  label: "بدهکار",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const debitRemained = {
  name: "debitRemained",
  field: "debitRemained",
  sortable: false,
  label: "مانده بدهکار",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const credit = {
  name: "credit",
  field: "credit",
  sortable: false,
  label: "بستانکار",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const creditRemained = {
  name: "creditRemained",
  field: "creditRemained",
  sortable: false,
  label: "مانده بستانکار",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const purchaseQuantity = {
  name: "purchaseQuantity",
  field: "purchaseQuantity",
  sortable: false,
  label: "ورود",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const salesQuantity = {
  name: "salesQuantity",
  field: "salesQuantity",
  sortable: false,
  label: "خروج",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const stock = {
  name: "stock",
  field: "stock",
  sortable: false,
  label: "موجودی",
  align: "left",
  class: "text-left",
  style: "width:170px;",
  showFilter: false,
};

export const unitTitle = {
  name: "unitTitle",
  field: "unitTitle",
  sortable: true,
  label: "واحد سنجش",
  align: "left",
  class: "text-left",
  style: "width:180px;",
  showFilter: true,
};

export const inlineQuantity = {
  name: "inlineQuantity",
  field: "inlineQuantity",
  sortable: false,
  label: "موجودی",
  align: "left",
  class: "text-left",
  showFilter: false,
};

export const price = {
  name: "price",
  field: "price",
  sortable: false,
  label: "مبلغ",
  align: "left",
  class: "text-left",
  showFilter: false,
};

export const summary = {
  name: "summary",
  field: "summary",
  sortable: false,
  label: "خلاصه",
  align: "left",
  class: "text-left",
  showFilter: false,
};
