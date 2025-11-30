<template>
  <form-toolbar-container
    title="جدول ساز"
    @submit-call-back="handleSave"
  />

  <div class="row q-col-gutter-md">
    <div class="col-md-4">
      <div class="column q-gutter-md">
        <q-card bordered>
          <q-card-section>
            <q-expansion-item icon="o_view_stream" label="ستون‌ها">
              <div class="row q-col-gutter-md q-py-sm">
                <div
                  v-for="col in defaultPalette"
                  :key="col.field"
                  class="col-md-6 col-sm-6 col-xs-12"
                >
                  <q-card
                    class="no-shadow q-hoverable cursor-pointer fit border-radius-xs"
                    bordered
                    clickable
                    @click="toggleColumn(col)"
                    @dragstart="handlePaletteDragStart($event, col)"
                    draggable="true"
                    v-ripple
                  >
                    <span class="q-focus-helper" />
                    <q-card-section
                      class="row items-center q-gutter-xs no-wrap"
                    >
                      <q-icon size="20px" name="o_view_stream" />
                      <div class="column">
                        <div class="text-body2">{{ col.label }}</div>
                      </div>
                      <q-space />
                      <q-icon
                        size="20px"
                        :name="
                          isColumnSelected(col)
                            ? 'o_check_circle'
                            : 'o_radio_button_unchecked'
                        "
                        :color="
                          isColumnSelected(col) ? 'positive' : 'grey'
                        "
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-expansion-item>

            <q-expansion-item
              icon="o_tune"
              label="تنظیمات کلی"
              default-opened
            >
              <div class="q-gutter-sm q-mt-sm">
                <q-toggle
                  v-model="designer.showHeader"
                  label="نمایش هدر"
                />
                <q-toggle
                  v-model="designer.showLogo"
                  label="نمایش لوگو در هدر"
                />
                <q-toggle
                  v-model="designer.showFooter"
                  label="نمایش فوتر"
                />
                <q-toggle
                  v-model="designer.showSignature"
                  label="نمایش امضا در فوتر"
                />
                <q-input
                  v-model="designer.headerTitle"
                  dense
                  outlined
                  label="عنوان هدر"
                />
                <q-input
                  v-model="designer.footerNote"
                  dense
                  outlined
                  label="یادداشت فوتر"
                  type="textarea"
                  autogrow
                />
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="col-md">
      <q-card bordered>
        <q-card-section>
          <!-- Preview HTML Template with Drag & Drop -->
          <div
            ref="previewContainer"
            v-html="previewHtmlTemplate"
          ></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch, nextTick } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { mediaType } from "src/constants";
  import { helper } from "src/helpers";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";

  const AVATAR_SIZES = {
    logo: { width: 120, height: 55 },
    signature: { width: 300, height: 200 },
  };

  const PREVIEW_ROW_COUNT = 3;
  const DEFAULT_COLUMN_FIELDS = [
    "rowNo",
    "productDisplay",
    "quantity",
    "price",
    "totalPrice",
  ];

  const $q = useQuasar();
  const { t } = useI18n();
  const appConfigStore = useAppConfigModel();

  const saving = ref(false);
  const selectedIndex = ref(-1);
  const dragData = ref({
    fromPalette: false,
    index: -1,
    payload: null,
  });
  const logoSrc = ref("");
  const signatureSrc = ref("");
  const showDueDate = ref(true);
  const previewContainer = ref(null);
  const previewTaxId = computed(
    () => previewInvoiceModel.value.lastApiLogModel?.taxId || ""
  );
  const previewCustomerName = computed(
    () => previewInvoiceModel.value.customerName
  );
  const previewCustomerNationalNo = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.business
        ?.nationalNo || ""
  );
  const previewCustomerTaxNo = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.business?.taxNo || ""
  );
  const previewCustomerAddress = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.address?.address ||
      ""
  );
  const previewCustomerLocation = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.address
        ?.locationTitle || ""
  );
  const previewCustomerPostalCode = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.address
        ?.postalCode || ""
  );
  const previewCustomerPhone = computed(
    () =>
      previewInvoiceModel.value.customerSummary?.phone?.value || ""
  );
  const previewSubTotal = computed(
    () => previewInvoiceModel.value.totalNetPrice || 0
  );
  const previewDiscount = computed(
    () => previewInvoiceModel.value.totalDiscount || 0
  );
  const previewVat = computed(
    () => previewInvoiceModel.value.totalVat || 0
  );
  const previewTotalQuantity = computed(() => {
    return (
      previewInvoiceModel.value.invoiceItems?.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      ) || 0
    );
  });
  const previewTotal = computed(
    () => previewInvoiceModel.value.totalPrice || 0
  );
  const previewCurrency = computed(
    () => previewInvoiceModel.value.currencyTitle || "ریال"
  );
  const previewInvoiceModel = ref({
    invoiceItems: [
      {
        rowNo: 1,
        productCode: "26135",
        productTitle: "موز اکوادور",
        productDisplay: "26135 - موز اکوادور",
        quantity: 1.0,
        productUnitTitle: "کیلوگرم",
        price: 0.0,
        totalPrice: 0.0,
        comment: "سلام شرح ردیف",
      },
      {
        rowNo: 2,
        productCode: "002w-41",
        productTitle: "موس",
        productDisplay: "002w-41 - موس",
        quantity: 4.0,
        productUnitTitle: "عدد",
        price: 45.0,
        totalPrice: 180.0,
        comment: null,
      },
    ],
    totalNetPrice: 180.0,
    totalDiscount: 0.0,
    totalVat: 0.0,
    totalPrice: 180.0,
    currencyTitle: "ریال",
    invoiceRemained: {
      payedAmount: 858000000,
      remained: 857999820,
      otherRemained: 1048226800,
      totalRemained: 190226980,
    },
    customerName: "خشایار شمالی",
    customerSummary: {
      business: {
        nationalNo: "0481038280",
        taxNo: "ثقثث",
      },
      address: {
        locationTitle: "تهران",
        address: "خیایان شهید رجایی - شهرک سیزده آب",
        postalCode: "1881",
      },
      phone: {
        value: "02155511102",
      },
    },
    no: 297,
    date: "1402/03/11",
    dueDate: "1402/04/10",
    lastApiLogModel: {
      taxId: "0123456789",
    },
    contractTitle: null,
    summary:
      "با سلام و عرض ادب خدمت تیم لاندا، لطفا پس از بررسی اقدام لازم انجام گیرد.",
  });

  const previewInvoiceRemained = computed(
    () => previewInvoiceModel.value.invoiceRemained
  );

  const defaultPalette = [
    {
      field: "rowNo",
      label: "ردیف",
    },
    {
      field: "productCode",
      label: "کد",
    },
    {
      field: "productTitle",
      label: "شرح کالا/خدمت",
    },
    {
      field: "productDisplay",
      label: "کالا / خدمت",
    },
    {
      field: "quantity",
      label: "تعداد/مقدار",
    },
    {
      field: "productUnitTitle",
      label: "واحد",
    },
    {
      field: "price",
      label: "مبلغ واحد",
    },
    {
      field: "lineTotal",
      label: "مبلغ",
    },
    {
      field: "discount",
      label: "تخفیف",
    },
    {
      field: "netAmount",
      label: "خالص",
    },
    {
      field: "vatAmount",
      label: "مالیات",
    },
    {
      field: "totalPrice",
      label: "جمع کل (ریال)",
    },
  ];

  const designer = ref({
    showHeader: true,
    showFooter: true,
    showLogo: true,
    showSignature: true,
    headerTitle: "",
    footerNote: "",
    columns: [],
  });

  const shouldShowLogo = computed(
    () =>
      appConfigStore.model?.value?.companySetting?.invoiceShowLogo ??
      false
  );

  const shouldShowSignature = computed(
    () =>
      appConfigStore.model?.value?.companySetting
        ?.invoiceShowSignature ?? false
  );

  const headerTitle = computed(() => {
    return designer.value.headerTitle || t("shared.labels.invoice");
  });

  const isColumnSelected = (col) => {
    return designer.value.columns.some((c) => c.field === col.field);
  };

  const toggleColumn = (col) => {
    const index = designer.value.columns.findIndex(
      (c) => c.field === col.field
    );
    if (index > -1) {
      removeColumn(index);
    } else {
      addColumn(col);
    }
  };

  const addColumn = (col) => {
    designer.value.columns.push({
      id: generateId(),
      field: col.field,
      label: col.label,
      width: col.width,
      align: col.align,
      sample: col.sample,
    });
    if (selectedIndex.value === -1) {
      selectedIndex.value = 0;
    }
  };

  const removeColumn = (index) => {
    designer.value.columns.splice(index, 1);
    if (selectedIndex.value >= designer.value.columns.length) {
      selectedIndex.value = designer.value.columns.length - 1;
    }
  };

  const getCellStyle = (col) => {
    return {
      borderWidth: "1px",
      borderStyle: "solid",
      borderImage: "initial",
      padding: "5px",
      minWidth: col.width ? `${col.width}px` : undefined,
      width: col.width ? `${col.width}px` : undefined,
    };
  };

  const getTbodyCellStyle = (col) => {
    return {
      padding: "5px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderImage: "initial",
      minWidth: col.width ? `${col.width}px` : undefined,
      width: col.width ? `${col.width}px` : undefined,
    };
  };

  const getCellAlignClass = (col) => {
    const alignMap = {
      center: "text-center",
      left: "text-left",
      right: "text-left",
    };
    return alignMap[col.align] || "text-left";
  };

  const getSampleCellValue = (col) => {
    return col.sample ?? "";
  };

  const getCellValue = (item, col) => {
    if (!item || !col) return "";

    switch (col.field) {
      case "rowNo":
        return item.rowNo || "";
      case "productCode":
        return item.productCode || "";
      case "productTitle":
        return item.productTitle || "";
      case "productDisplay":
        return item.productCode && item.productTitle
          ? `${item.productCode} - ${item.productTitle}`
          : item.productTitle || item.productCode || "";
      case "quantity":
        const qty = helper.formatNumber(item.quantity || 0);
        return item.productUnitTitle
          ? `${qty} (${item.productUnitTitle})`
          : qty;
      case "productUnitTitle":
        return item.productUnitTitle || "";
      case "price":
        return helper.formatNumber(item.price || 0);
      case "lineTotal":
        return helper.formatNumber(
          (item.quantity || 0) * (item.price || 0)
        );
      case "totalPrice":
        return helper.formatNumber(item.totalPrice || 0);
      case "discount":
        return helper.formatNumber(item.discount || 0);
      case "vatAmount":
        return helper.formatNumber(item.vatAmount || 0);
      default:
        return item[col.field] || col.sample || "";
    }
  };

  const formatPreviewNumber = (num) => {
    if (typeof num !== "number") return num;
    return helper.formatNumber(num);
  };

  const hasDiscountColumn = computed(() => {
    return designer.value.columns.some((c) => c.field === "discount");
  });

  const hasVatColumn = computed(() => {
    return designer.value.columns.some(
      (c) => c.field === "vatAmount"
    );
  });

  const hasQuantityColumn = computed(() => {
    return designer.value.columns.some((c) => c.field === "quantity");
  });

  const previewHtmlTemplate = computed(() => {
    const model = previewInvoiceModel.value;
    const company = appConfigStore.model?.value?.companySetting;
    const cols = designer.value.columns;

    let html = "";

    // Header Section (Logo, Title, Invoice Info)
    if (designer.value.showHeader) {
      html += `
        <div class="column q-gutter-xs">
          <table style="width: 100%">
            <tbody>
              <tr>
                <td style="width: 25%">
                  ${
                    designer.value.showLogo &&
                    shouldShowLogo.value &&
                    logoSrc.value
                      ? `<img src="${logoSrc.value}" alt="logo" />`
                      : ""
                  }
                </td>
                <td>
                  <div class="text-center text-body2 text-bold">
                    ${headerTitle.value}
                  </div>
                </td>
                <td style="width: 25%">
                  <div>
                    <span>${t("shared.labels.no")}:</span>
                    <span class="q-px-sm text-weight-600">${
                      model.no ?? ""
                    }</span>
                  </div>
                  <div>
                    <span>${t("shared.labels.date")}:</span>
                    <span class="q-px-sm text-weight-600">${
                      model.date ?? ""
                    }</span>
                  </div>
                  ${
                    showDueDate.value && model.dueDate
                      ? `<div>
                        <span>${t("shared.labels.dueDate")}:</span>
                        <span class="q-px-sm text-weight-600">${
                          model.dueDate
                        }</span>
                      </div>`
                      : ""
                  }
                  ${
                    previewTaxId.value
                      ? `<div class="row justify-start">
                        <span>${t("shared.columns.taxId")}:</span>
                        <span class="q-px-sm text-roboto text-weight-500" style="font-size: 12px">
                          ${previewTaxId.value}
                        </span>
                      </div>`
                      : ""
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Company and Customer Info Table
      const screenWidth = $q.screen.gt.xs
        ? "width: 100%;"
        : "width: 900px";
      html += `
        <div class="q-table__middle scroll q-pt-md q-pb-sm">
          <table style="${screenWidth} border-width: 1px; border-style: solid; border-collapse: collapse; font-size: 13px;" class="print-preview-table">
      `;

      // Company Info
      if (company) {
        html += `
          <tbody>
            <tr>
              <td style="border-width: 1px; border-style: solid; padding: 3px;">
                <div>
                  ${t("shared.labels.seller")}:
                  <strong>${company.name ?? ""}</strong>
                  ${
                    company.nationalNo
                      ? `<span> / ${t("shared.labels.nationalNo")}: ${
                          company.nationalNo
                        }</span>`
                      : company.taxNo
                      ? `<span> / ${t("shared.labels.taxNo")}: ${
                          company.taxNo
                        }</span>`
                      : ""
                  }
                </div>
                <div>
                  ${t("shared.columns.address")}:
                  <strong>${company.location ?? ""}${
          company.location ? " -" : ""
        }</strong>
                  <span class="text-wrap">${
                    company.address ?? ""
                  }</span>
                  ${
                    company.postalCode
                      ? `<span class="q-px-sm"><strong>${t(
                          "shared.labels.postalCode"
                        )}:</strong> ${company.postalCode}</span>`
                      : ""
                  }
                  ${
                    company.phone
                      ? `<span> ${t("shared.labels.phone")}: ${
                          company.phone
                        }</span>`
                      : ""
                  }
                </div>
              </td>
            </tr>
          </tbody>
        `;
      }

      // Customer Info
      html += `
        <tbody>
          <tr>
            <td style="border-width: 1px; border-style: solid; padding: 3px;">
              <div>
                ${t("shared.labels.customer")}:
                <strong>${previewCustomerName.value ?? ""}</strong>
                ${
                  previewCustomerNationalNo.value
                    ? `<span> / ${t("shared.labels.nationalNo")}: ${
                        previewCustomerNationalNo.value
                      }</span>`
                    : previewCustomerTaxNo.value
                    ? `<span> / ${t("shared.labels.taxNo")}: ${
                        previewCustomerTaxNo.value
                      }</span>`
                    : ""
                }
              </div>
              ${
                previewCustomerAddress.value
                  ? `<div>
                    ${t("shared.columns.address")}:
                    ${
                      previewCustomerLocation.value
                        ? `<strong>${previewCustomerLocation.value} -</strong>`
                        : ""
                    }
                    <span class="text-wrap">${
                      previewCustomerAddress.value
                    }</span>
                    ${
                      previewCustomerPostalCode.value
                        ? `<span> / <strong>${t(
                            "shared.labels.postalCode"
                          )}:</strong> ${
                            previewCustomerPostalCode.value
                          }</span>`
                        : ""
                    }
                  </div>`
                  : ""
              }
              ${
                previewCustomerPhone.value
                  ? `<div>${t("shared.labels.phone")}: ${
                      previewCustomerPhone.value
                    }</div>`
                  : ""
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      `;
    }

    // Items Table with Drag & Drop Header
    html += `
      <div class="q-table__middle scroll">
        <table style="width: 100%; border-width: 1px; border-style: solid; border-collapse: collapse; font-size: 12.4px;" class="print-preview-table">
          <thead>
            <tr>
              ${cols
                .map((col, index) => {
                  const style = getCellStyle(col);
                  const styleStr = Object.entries(style)
                    .map(
                      ([k, v]) =>
                        `${k
                          .replace(/([A-Z])/g, "-$1")
                          .toLowerCase()}: ${v}`
                    )
                    .join("; ");
                  return `<th
                    style="${styleStr}"
                    data-index="${index}"
                    draggable="true"
                    class="drag-drop-header"
                  >
                    <div class="row items-center justify-between no-wrap">
                      <span>${col.label ?? ""}</span>
                      <span style="cursor: move; user-select: none;">⋮⋮</span>
                    </div>
                  </th>`;
                })
                .join("")}
            </tr>
          </thead>
          <tbody>
    `;

    // Items Rows
    if (model.invoiceItems && model.invoiceItems.length > 0) {
      html += model.invoiceItems
        .map((item, index) => {
          return `
          <tr>
            ${cols
              .map((col) => {
                const cellValue = getCellValue(item, col);
                const cellStyle = getTbodyCellStyle(col);
                const alignClass = getCellAlignClass(col);
                const styleStr = Object.entries(cellStyle)
                  .map(
                    ([k, v]) =>
                      `${k
                        .replace(/([A-Z])/g, "-$1")
                        .toLowerCase()}: ${v}`
                  )
                  .join("; ");

                const isProductField =
                  col.field === "productTitle" ||
                  col.field === "productDisplay";
                const hasComment =
                  item.comment && col.field === "productDisplay";

                if (isProductField) {
                  return `
                  <td style="${styleStr}" class="${alignClass}">
                    <div class="text-wrap">
                      ${cellValue}
                      ${
                        hasComment
                          ? `<small> (${item.comment})</small>`
                          : ""
                      }
                    </div>
                  </td>
                `;
                }

                return `<td style="${styleStr}" class="${alignClass}">${cellValue}</td>`;
              })
              .join("")}
          </tr>
        `;
        })
        .join("");
    }

    // Summary Rows
    if (cols.length > 0) {
      const colspan = cols.length - 1;
      const summaryStyle =
        "padding: 5px; border-width: 1px; border-style: solid; text-align: end;";
      const valueStyle =
        "padding: 5px; border-width: 1px; border-style: solid;";

      // SubTotal
      html += `
        <tr>
          <td style="${summaryStyle}" colspan="${colspan}" class="text-right">
            ${t("shared.labels.subTotal")}:
          </td>
          <td style="${valueStyle}">
            <strong>${formatPreviewNumber(
              previewSubTotal.value
            )}</strong>
          </td>
        </tr>
      `;

      // Discount
      if (hasDiscountColumn.value && previewDiscount.value) {
        html += `
          <tr>
            <td style="${summaryStyle}" colspan="${colspan}" class="text-right">
              ${t("shared.labels.discount")}:
            </td>
            <td style="${valueStyle}">
              <strong>${formatPreviewNumber(
                previewDiscount.value
              )}</strong>
            </td>
          </tr>
        `;
      }

      // VAT
      if (hasVatColumn.value && previewVat.value) {
        html += `
          <tr>
            <td style="${summaryStyle}" colspan="${colspan}" class="text-right">
              ${t("shared.labels.vat")}:
            </td>
            <td style="${valueStyle}">
              <strong>${formatPreviewNumber(
                previewVat.value
              )}</strong>
            </td>
          </tr>
        `;
      }

      // Total Quantity
      if (hasQuantityColumn.value && model.invoiceItems?.length > 1) {
        html += `
          <tr>
            <td style="${summaryStyle}" colspan="${colspan}" class="text-right">
              ${t("shared.labels.totalQuantity")}:
            </td>
            <td style="${valueStyle}">
              <strong>${formatPreviewNumber(
                previewTotalQuantity.value
              )}</strong>
            </td>
          </tr>
        `;
      }

      // Total
      html += `
        <tr>
          <td style="${summaryStyle}" colspan="${colspan}" class="text-right">
            <strong>${t("shared.labels.total")}:</strong>
          </td>
          <td style="${valueStyle}">
            <strong>${formatPreviewNumber(
              previewTotal.value
            )}</strong>
            ${previewCurrency.value}
          </td>
        </tr>
      `;
    }

    html += `
          </tbody>
        </table>
      </div>
    `;

    // Footer Section
    if (designer.value.showFooter) {
      const footerWidth = $q.screen.gt.xs
        ? "width:100%"
        : "width:900px";
      html += `
        <div class="q-table__middle scroll q-pt-sm">
          <table style="${footerWidth}; width: 100%; border-width: 1px; border-style: solid; border-collapse: collapse; font-size: 13px;" class="print-preview-table">
            <tbody>
      `;

      // Remained Info
      if (
        previewInvoiceRemained.value &&
        company?.showRemainedInInvoice
      ) {
        const remained = previewInvoiceRemained.value;
        html += `
          <tr>
            <td style="padding: 5px; border-width: 1px; border-style: solid; text-align: left;" colspan="100%">
              <span>
                <strong style="padding: 0 5px">${t(
                  "shared.columns.totalReceipt"
                )}</strong>
                ${formatPreviewNumber(remained.payedAmount ?? 0)}
              </span>
              <span>
                <strong style="padding: 0 5px">${t(
                  "shared.columns.remained"
                )}</strong>
                <span class="text-weight-600">${formatPreviewNumber(
                  remained.remained ?? 0
                )}</span>
              </span>
              ${
                remained.otherRemained
                  ? `<span>
                    <strong style="padding: 0 5px">${t(
                      "shared.columns.remainedButThisYear"
                    )}</strong>
                    <span class="text-weight-600">${formatPreviewNumber(
                      remained.otherRemained
                    )}</span>
                  </span>
                  <span>
                    <strong style="padding: 0 5px">${t(
                      "shared.columns.remainedTotal"
                    )}</strong>
                    ${formatPreviewNumber(
                      remained.totalRemained ?? 0
                    )}
                  </span>`
                  : ""
              }
            </td>
          </tr>
        `;
      }

      // Comments
      if (
        model.contractTitle ||
        model.summary ||
        designer.value.footerNote
      ) {
        html += `
          <tr>
            <td style="padding: 5px; border-width: 1px; border-style: solid;" colspan="100%">
              <strong>${t("shared.labels.comment")}</strong>
              <div>
                ${
                  model.contractTitle
                    ? `<strong>${model.contractTitle}${
                        model.summary
                          ? '<span style="padding: 5px"> /</span>'
                          : ""
                      }</strong>`
                    : ""
                }
                ${
                  model.summary
                    ? `<span class="text-wrap">${model.summary}</span>`
                    : ""
                }
              </div>
              ${
                designer.value.footerNote
                  ? `<div class="text-wrap">${designer.value.footerNote}</div>`
                  : ""
              }
            </td>
          </tr>
        `;
      }

      // Signature
      html += `
        <tr>
          <td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; width: 50%; height: 90px; vertical-align: top;">
            ${t("shared.labels.sellerSignature")}
            ${
              designer.value.showSignature &&
              shouldShowSignature.value &&
              signatureSrc.value
                ? `<div><img src="${signatureSrc.value}" alt="signature" style="width: 120px" /></div>`
                : ""
            }
          </td>
        </tr>
      `;

      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    return html;
  });

  const handlePaletteDragStart = (event, col) => {
    dragData.value = { fromPalette: true, index: -1, payload: col };
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "copy";
    }
  };

  const handleActiveDragStart = (event, index) => {
    dragData.value = { fromPalette: false, index, payload: null };
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  };

  const handleActiveDrop = (event, targetIndex) => {
    const { fromPalette, index, payload } = dragData.value;

    if (fromPalette && payload) {
      handlePaletteDrop(payload, targetIndex);
    } else if (!fromPalette && index > -1) {
      handleColumnReorder(index, targetIndex);
    }

    dragData.value = { fromPalette: false, index: -1, payload: null };
  };

  const handlePaletteDrop = (payload, targetIndex) => {
    const existingIndex = designer.value.columns.findIndex(
      (c) => c.field === payload.field
    );

    if (existingIndex > -1) {
      const item = designer.value.columns.splice(existingIndex, 1)[0];
      designer.value.columns.splice(targetIndex, 0, item);
      selectedIndex.value = targetIndex;
    } else {
      designer.value.columns.splice(targetIndex, 0, {
        id: generateId(),
        field: payload.field,
        label: payload.label,
        width: payload.width,
        align: payload.align,
        sample: payload.sample,
      });
      if (selectedIndex.value === -1) {
        selectedIndex.value = targetIndex;
      }
    }
  };

  const handleColumnReorder = (fromIndex, targetIndex) => {
    if (fromIndex === targetIndex) return;

    const item = designer.value.columns.splice(fromIndex, 1)[0];
    designer.value.columns.splice(targetIndex, 0, item);
    selectedIndex.value = targetIndex;
  };

  const loadMediaAssets = async () => {
    try {
      if (!appConfigStore.model.value?.companySetting?.id) {
        await appConfigStore.reloadData?.();
      }

      appConfigStore.resetAvatars?.();

      const [logo, signature] = await Promise.all([
        appConfigStore.getAvatar?.(
          mediaType.avatar,
          AVATAR_SIZES.logo.width,
          AVATAR_SIZES.logo.height
        ),
        appConfigStore.getAvatar?.(
          mediaType.signature,
          AVATAR_SIZES.signature.width,
          AVATAR_SIZES.signature.height
        ),
      ]);

      logoSrc.value = logo || "";
      signatureSrc.value = signature || "";
    } catch (error) {
      console.error("Failed to load media assets:", error);
    }
  };

  const loadTemplateConfig = () => {
    const config =
      appConfigStore.model.value?.companySetting
        ?.invoiceTableTemplate;

    if (config && typeof config === "object") {
      designer.value = {
        showHeader: config.showHeader !== false,
        showFooter: config.showFooter !== false,
        showLogo: config.showLogo !== false,
        showSignature: config.showSignature !== false,
        headerTitle: config.headerTitle || "",
        footerNote: config.footerNote || "",
        columns: Array.isArray(config.columns)
          ? config.columns.map((c) => ({
              ...c,
              id: c.id || generateId(),
            }))
          : [],
      };

      if (designer.value.columns.length) {
        selectedIndex.value = 0;
      }
    } else {
      initializeDefaultColumns();
    }
  };

  const initializeDefaultColumns = () => {
    DEFAULT_COLUMN_FIELDS.forEach((field) => {
      const paletteItem = defaultPalette.find(
        (x) => x.field === field
      );
      if (paletteItem) {
        addColumn(paletteItem);
      }
    });

    designer.value.headerTitle = "صورت حساب فروش کالا و خدمات";
    designer.value.footerNote = "از خرید شما سپاسگزاریم.";
  };

  const loadInitial = async () => {
    await loadMediaAssets();
    loadTemplateConfig();
  };

  const handleSave = async () => {
    try {
      saving.value = true;

      const payload = {
        showHeader: designer.value.showHeader,
        showFooter: designer.value.showFooter,
        showLogo: designer.value.showLogo,
        showSignature: designer.value.showSignature,
        headerTitle: designer.value.headerTitle,
        footerNote: designer.value.footerNote,
        columns: designer.value.columns.map((c) => ({
          id: c.id,
          field: c.field,
          label: c.label,
          width: c.width,
          align: c.align,
        })),
      };

      appConfigStore.model.value.companySetting = {
        ...(appConfigStore.model.value.companySetting || {}),
        invoiceTableTemplate: payload,
      };

      await appConfigStore.saveAppConfig();
      $q.notify({ type: "positive", message: "ذخیره شد" });
    } catch (error) {
      console.error("Failed to save configuration:", error);
      $q.notify({
        type: "negative",
        message: "خطا در ذخیره تنظیمات",
      });
    } finally {
      saving.value = false;
    }
  };

  const generateId = () => {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2);
  };

  // Setup drag & drop event delegation for preview HTML
  const setupDragAndDrop = () => {
    if (!previewContainer.value) return;

    const container = previewContainer.value;

    // Remove existing listeners
    const headers = container.querySelectorAll(".drag-drop-header");
    headers.forEach((header) => {
      header.removeEventListener("dragstart", handleHeaderDragStart);
      header.removeEventListener("dragover", handleHeaderDragOver);
      header.removeEventListener("drop", handleHeaderDrop);
    });

    // Add new listeners
    headers.forEach((header) => {
      header.addEventListener("dragstart", handleHeaderDragStart);
      header.addEventListener("dragover", handleHeaderDragOver);
      header.addEventListener("drop", handleHeaderDrop);
    });
  };

  const handleHeaderDragStart = (event) => {
    const header = event.target.closest(".drag-drop-header");
    if (!header) return;
    const index = parseInt(header.dataset.index || "-1");
    if (index >= 0) {
      handleActiveDragStart(event, index);
    }
  };

  const handleHeaderDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleHeaderDrop = (event) => {
    event.preventDefault();
    const header = event.target.closest(".drag-drop-header");
    if (!header) return;
    const index = parseInt(header.dataset.index || "-1");
    if (index >= 0) {
      handleActiveDrop(event, index);
    }
  };

  // Watch for changes in previewHtmlTemplate and setup drag & drop
  watch(
    () => previewHtmlTemplate.value,
    () => {
      nextTick(() => {
        setupDragAndDrop();
      });
    },
    { immediate: true }
  );

  onMounted(() => {
    loadInitial();
    nextTick(() => {
      setupDragAndDrop();
    });
  });
</script>

<style scoped>
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }
</style>
