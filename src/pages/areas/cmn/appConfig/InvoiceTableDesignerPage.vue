<template>
  <form-toolbar-container
    title="ویرایش قالب چاپ"
    @submit-call-back="handleSave"
  />

  <div class="row q-col-gutter-md">
    <div class="col-md-4">
      <div class="column q-gutter-md">
        <q-card bordered>
          <q-card-section>
            <q-list separator class="rounded-borders">
              <q-expansion-item
                icon="o_view_stream"
                label="ستون‌ها"
                class="settings-expansion-item"
              >
                <q-card-section
                  class="row q-col-gutter-sm q-py-sm q-px-none"
                >
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
                      v-ripple
                    >
                      <span class="q-focus-helper" />
                      <q-card-section
                        class="row items-center q-gutter-xs no-wrap"
                      >
                        <q-icon size="20px" name="o_view_stream" />
                        <div class="q-item__label">
                          {{ col.label }}
                        </div>
                        <q-space />
                        <q-icon
                          size="20px"
                          :name="getColumnIcon(col)"
                          :color="getColumnColor(col)"
                        />
                      </q-card-section>
                    </q-card>
                  </div>
                </q-card-section>
              </q-expansion-item>

              <q-expansion-item
                icon="o_description"
                label="سربرگ"
                default-opened
                class="settings-expansion-item"
              >
                <q-card-section class="column q-py-sm q-px-none">
                  <div class="column q-gutter-sm q-pb-md">
                    <q-toggle
                      dense
                      v-model="designer.showHeader"
                      label="سربرگ"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showLogo"
                      label="لوگو"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showInvoiceInfo"
                      label="شماره و تاریخ"
                    />
                  </div>
                  <q-input
                    v-model="designer.headerTitle"
                    dense
                    outlined
                    label="عنوان سربرگ"
                  />
                </q-card-section>
              </q-expansion-item>

              <q-expansion-item
                icon="o_people"
                label="فروشنده و خریدار"
                class="settings-expansion-item"
              >
                <q-card-section class="column q-py-sm q-px-none">
                  <div class="column q-gutter-sm">
                    <q-toggle
                      dense
                      v-model="designer.showSellerInfo"
                      label="فروشنده"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showCustomerInfo"
                      label="خریدار"
                    />
                  </div>
                </q-card-section>
              </q-expansion-item>

              <q-expansion-item
                icon="o_table_chart"
                label="اقلام فاکتور"
                class="settings-expansion-item"
              >
                <q-card-section class="column q-py-sm q-px-none">
                  <div class="column q-gutter-sm">
                    <q-toggle
                      dense
                      v-model="designer.showInvoiceItems"
                      label="اقلام فاکتور"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showRemained"
                      label="مانده"
                    />
                  </div>
                </q-card-section>
              </q-expansion-item>

              <q-expansion-item
                icon="o_description"
                label="پاورقی"
                class="settings-expansion-item"
              >
                <q-card-section class="column q-py-sm q-px-none">
                  <div class="column q-gutter-sm">
                    <q-toggle
                      dense
                      v-model="designer.showFooter"
                      label="پاورقی"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showSummary"
                      label="شرح"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showContract"
                      label="قرارداد"
                    />

                    <q-toggle
                      dense
                      v-model="designer.showSignature"
                      label="امضا"
                    />
                  </div>
                  <q-input
                    v-model="designer.footerNote"
                    dense
                    outlined
                    label="یادداشت "
                    type="textarea"
                    autogrow
                    class="q-mt-md"
                  />
                </q-card-section>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="col-md">
      <q-card bordered>
        <div v-html="renderedTemplate"></div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { mediaType } from "src/constants";
  import { helper } from "src/helpers";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CodeOutputDialog from "./CodeOutputDialog.vue";

  const AVATAR_SIZES = {
    logo: { width: 120, height: 55 },
    signature: { width: 300, height: 200 },
  };

  const { t } = useI18n();
  const $q = useQuasar();
  const appConfigStore = useAppConfigModel();

  const logoSrc = ref("");
  const signatureSrc = ref("");

  const items = ref({
    docTypeId: "7b1af164-933c-4b5e-a4f0-0d71f95631b5",
    fiscalYearId: "8a95918d-12b6-4d6e-a847-b5ebbf06ce5c",
    no: 297,
    inventoryId: "11111111-0000-1111-0000-000000000001",
    contractId: "c7d790eb-ffc4-46c1-927c-9bc428eb4be9",
    currencyId: "3cb80957-7dee-4d87-bbef-6b9583d9e3bf",
    typeId: "3a9d106c-fe74-42fc-9a11-29a9dd16a851",
    customerId: "2041c16e-8285-4168-9e88-8748f6c88827",
    amount: 180.0,
    vatAmount: 0.0,
    discountAmount: 0.0,
    subject: "فاکتور فروش موز اکوادور-موس",
    summary:
      "با سلام و عرض ادب خدمت تیم لاندا، لطفا پس از بررسی اقدام لازم انجام گیرد.",
    statusId: "c84e9c9d-31e6-4f45-9a6d-265d825e3d4c",
    statusTitle: "دائم",
    rowNo: "7463",
    date: "1402/03/11",
    dueDate: "1402/04/10",
    receivedAmount: 858000000.0,
    typeTitle: "فروش نقدی کالا و خدمات",
    paymentTypeId: 1,
    customerName: "خشایار شمالی",
    customerTypeId: 172,
    inventoryTitle: "انبار مرکزی",
    currencyTitle: "ریال",
    voucherId: "6d6ca098-cb62-41ea-bdea-f2d705c3a43f",
    voucherNo: 62,
    invoiceNo: 0,
    contractNo: "1600",
    contractTitle:
      "سفارش شماره 1600 شماره 1403 گمرک به سند 240 مجوز 5 - دفتر کار شماره 540",
    creationType: "ByUser",
    customerSummary: {
      typeId: 0,
      gender: 0,
      nationalCode: "0481038280",
      address: {
        customerId: null,
        contactTypeId: null,
        locationId: null,
        locationTitle: "تهران",
        address: "خیایان شهید رجایی - شهرک سیزده آب",
        postalCode: "1881",
        isPrimary: false,
        id: null,
        emptyModel: false,
      },
      phone: {
        customerId: null,
        contactTypeId: null,
        contactTypeTitle: "تلفن محل کار",
        typeId: 0,
        value: "02155511102",
        isPrimary: false,
        id: null,
        emptyModel: false,
      },
      business: {
        taxNo: "ثقثث",
        insuranceWorkNo: "55",
        nationalNo: "0481038280",
        regNo: "45555",
        regDate: "1402/07/08",
        customerId: null,
        id: null,
        emptyModel: false,
      },
    },
    invoiceItems: [
      {
        quoteId: null,
        invoiceId: null,
        rowNo: 1,
        productId: "57ee96c6-8107-42ca-a92e-7b504f634f85",
        quantity: 1.0,
        discountPercent: 0.0,
        discount: 0.0,
        vatId: "7c5c5cae-bcf8-4713-9bec-a705afa3c119",
        vatPercent: 0.0,
        vatAmount: 0.0,
        price: 0.0,
        totalPrice: 0.0,
        comment: "سلام شرح ردیف",
        productCode: "26135",
        productTitle: "موز اکوادور",
        productDisplay: "26135-موز اکوادور",
        productUnitId: "47d4e382-e788-441f-ace0-a60872c23d93",
        productTypeId: 0,
        productUnitTitle: "کیلوگرم",
        vatTitle: "بدون ارزش افزوده",
        invoiceNo: 0,
        cogsAmount: 0,
        id: "fdfc6ac5-371f-4994-ad67-d2ab53c6c1f4",
        recordVersion: "-7714939940080975872",
        emptyModel: false,
      },
      {
        quoteId: null,
        invoiceId: null,
        rowNo: 2,
        productId: "c338ea12-3624-4eb6-b333-f0b8e6586c5b",
        quantity: 4.0,
        discountPercent: 0.0,
        discount: 0.0,
        vatId: "7c5c5cae-bcf8-4713-9bec-a705afa3c119",
        vatPercent: 0.0,
        vatAmount: 0.0,
        price: 45.0,
        totalPrice: 180.0,
        productCode: "002w-41",
        productTitle: "موس",
        productDisplay: "002w-41-موس",
        productUnitId: "a544b002-390a-44e6-9b45-741a723d5663",
        productTypeId: 0,
        productUnitTitle: "عدد",
        vatTitle: "بدون ارزش افزوده",
        invoiceNo: 0,
        cogsAmount: 0,
        id: "059a711b-1a83-4d5f-8f8a-a6aeac03d499",
        recordVersion: "-7642882346043047936",
        emptyModel: false,
      },
    ],
    manualNo: false,
    precisionCount: 2,
    displayFormat: 0,
    transportationCost: 0,
    invoiceRemained: {
      amount: 180.0,
      payedAmount: 858000000.0,
      remained: -857999820.0,
      otherRemained: 1048226800.0,
      totalRemained: 190226980.0,
    },
    id: "ed601a7c-0dc4-4a9f-8939-06ea1ea7823b",
    recordVersion: "-7786997534118903808",
    emptyModel: false,
  });

  const templateHtml = ref(`<div>
  <div class="q-card__section q-card__section--vert q-pb-none" name="header">
  <table style="width: 100%;">
  <tbody>
  <tr>
  <td style="width: 25%;" name="logo"><img src="{{logoSrc}}" alt="logo"></td>
  <td><div class="text-center text-body2 text-bold">{{headerTitle}}</div></td>
  <td style="width: 25%;" name="invoiceInfo"><div><span>شماره:</span><span class="q-px-sm text-weight-600">{{no}}</span></div><div><span>تاریخ:</span><span class="q-px-sm text-weight-600">{{date}}</span></div></td>
  </tr>
  </tbody>
  </table>
  </div>
  <div class="q-card__section q-card__section--vert q-gutter-y-sm">
  <div class="q-table__middle scroll">
  <table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;">
  <tbody name="sellerInfo">
  <tr>
  <td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>فروشنده: <strong>{{sellerName}}</strong></div><div>نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span></div></td>
  </tr>
  </tbody>
  <tbody name="customerInfo">
  <tr>
  <td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>مشتری: <strong>{{customerName}}</strong><span> / شناسه ملی: {{customerNationalNo}}</span></div><div>نشانی: <strong>{{customerLocation}} - </strong><span class="text-wrap">{{customerAddress}}</span><span> / <strong>کد پستی:</strong> {{customerPostalCode}}</span></div><div>تلفن: {{customerPhone}}</div></td>
  </tr>
  </tbody>
  </table>
  </div>
  <div class="q-table__middle scroll" name="invoiceItems">
  <table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 12.4px;">
  <thead>
  <tr>
  <th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">ردیف</th>
  <th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">کالا / خدمت</th>
  <th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">تعداد/مقدار</th>
  <th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">مبلغ واحد</th>
  <th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">جمع کل (ریال) </th>
  </tr>
  </thead>
  <tbody>
  {{#items}}
  <tr>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}} <small>({{productUnitTitle}})</small></td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{price}}</td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td>
  </tr>
  {{/items}}
  <tr>
  <td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">سرجمع: </td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td>
  </tr>
  <tr>
  <td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">تخفیف: </td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td>
  </tr>
  <tr>
  <td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">ارزش افزوده: </td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td>
  </tr>
  <tr>
  <td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">جمع مقدار: </td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalQuantity}}</strong></td>
  </tr>
  <tr>
  <td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong></td>
  <td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong> {{currencyTitle}}</td>
  </tr>
  </tbody>
  </table>
  </div>
  <div class="q-table__middle scroll" name="footer">
  <table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;">
  <tbody>
  <tr name="remained">
  <td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: left;"><span><strong style="padding: 0px 5px;">جمع دریافتی</strong> {{remainedPayedAmount}}</span><span><strong style="padding: 0px 5px;">مانده</strong><span class="text-weight-600">{{remainedAmount}}</span></span><span><strong style="padding: 0px 5px;">مانده از قبل</strong><span class="text-weight-600">{{remainedOtherRemained}}</span></span><span><strong style="padding: 0px 5px;">جمع مانده</strong> {{remainedTotalRemained}}</span></td>
  </tr>
  <tr name="summary">
  <td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>شرح</strong><div><strong name="contract">{{contractTitle}}<span style="padding: 5px;"> / </span></strong><span class="text-wrap">{{summary}}</span></div><div class="text-wrap">{{footerNote}}</div></td>
  </tr>
  <tr name="signature">
  <td colspan="100%" class="text-body2 vertical-top" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; width: 50%; height: 90px;">مهر و امضا فروشنده <div><img src="{{signatureSrc}}" alt="signature" style="width: 120px;"></div></td>
  </tr>
  </tbody>
  </table>
  </div>
  </div>
  </div>`);

  const designer = ref({
    showHeader: true,
    showFooter: true,
    showLogo: true,
    showSignature: true,
    showInvoiceInfo: true,
    showSellerInfo: true,
    showCustomerInfo: true,
    showInvoiceItems: true,
    showRemained: true,
    showSummary: true,
    showContract: true,
    headerTitle: "",
    footerNote: "",
    columns: [],
  });

  const headerTitle = computed(
    () =>
      designer.value.headerTitle ||
      appConfigStore.model?.value?.companySetting?.invoiceTitle ||
      t("shared.labels.invoice")
  );

  const formatNumber = (value) =>
    typeof value === "number"
      ? helper.formatNumber(value ?? 0)
      : value ?? 0;
  const replaceVar = (template, key, value) =>
    template.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, "g"),
      value != null ? String(value) : ""
    );

  const renderTemplate = (tpl, data) => {
    const loopRegex = /\{\{#items\}\}([\s\S]*?)\{\{\/items\}\}/,
      loopMatch = tpl.match(loopRegex);
    if (loopMatch) {
      const rowTemplate = loopMatch[1];
      tpl = tpl.replace(
        loopRegex,
        (data.items || [])
          .map((item) =>
            Object.keys(item).reduce(
              (row, key) => replaceVar(row, key, item[key]),
              rowTemplate
            )
          )
          .join("")
      );
    }
    Object.entries(data)
      .filter(([key]) => key !== "items")
      .forEach(([key, value]) => {
        tpl = replaceVar(tpl, key, value);
      });
    return tpl;
  };

  const safeGet = (obj, path, defaultValue = "") =>
    path
      .split(".")
      .reduce((val, key) => val?.[key] ?? defaultValue, obj) ??
    defaultValue;

  const company = computed(
    () => appConfigStore.model?.value?.companySetting
  );

  const invoiceData = computed(() => {
    const invoice = items.value,
      remained = invoice.invoiceRemained || {},
      customer = invoice.customerSummary || {},
      invoiceItems = invoice.invoiceItems || [];
    return {
      invoice,
      remained,
      customer,
      invoiceItems,
      totalQuantity: invoiceItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      ),
    };
  });

  const filterTemplateByAttributes = (html, settings) => {
    let filteredHtml = html;
    const attributeMap = {
      header: settings.showHeader,
      logo: settings.showLogo,
      invoiceInfo: settings.showInvoiceInfo,
      sellerInfo: settings.showSellerInfo,
      customerInfo: settings.showCustomerInfo,
      invoiceItems: settings.showInvoiceItems,
      remained: settings.showRemained,
      contract: settings.showContract,
      summary: settings.showSummary,
      signature: settings.showSignature,
      footer: settings.showFooter,
    };
    const removeElementByName = (html, attrName) => {
      let result = html,
        prevResult = "";
      while (result !== prevResult) {
        prevResult = result;
        const match = result.match(
          new RegExp(
            `<([a-zA-Z]+)[^>]*\\s+name=["']${attrName}["'][^>]*>`,
            "i"
          )
        );
        if (!match) break;
        const tag = match[1].toLowerCase(),
          start = match.index;
        let depth = 1,
          pos = start + match[0].length;
        while (depth > 0) {
          const open = result.indexOf(`<${tag}`, pos),
            close = result.indexOf(`</${tag}>`, pos);
          if (close === -1) break;
          if (open !== -1 && open < close) {
            depth++;
            pos = result.indexOf(">", open) + 1;
          } else {
            depth--;
            if (depth === 0) {
              result =
                result.slice(0, start) +
                result.slice(close + tag.length + 3);
              break;
            }
            pos = close + tag.length + 3;
          }
        }
      }
      return result;
    };

    Object.entries(attributeMap).forEach(([attrName, shouldShow]) => {
      if (!shouldShow)
        filteredHtml = removeElementByName(filteredHtml, attrName);
    });

    return filteredHtml
      .replace(/<tr[^>]*>\s*<\/tr>/gi, "")
      .replace(/<td[^>]*>\s*<\/td>/gi, "");
  };

  const renderedTemplate = computed(() => {
    const {
      invoice,
      remained,
      customer,
      invoiceItems,
      totalQuantity,
    } = invoiceData.value;
    const comp = company.value;

    const getProductDisplay = (item) =>
      item.productDisplay ||
      (item.productCode && item.productTitle
        ? `${item.productCode} - ${item.productTitle}`
        : item.productTitle || item.productCode || "");
    const templateData = {
      customerName: invoice.customerName || "",
      date: invoice.date || "",
      dueDate: invoice.dueDate || "",
      no: invoice.no || "",
      subject: invoice.subject || "",
      summary: invoice.summary || "",
      contractTitle: invoice.contractTitle || "",
      currencyTitle: invoice.currencyTitle || "ریال",
      totalNetPrice: formatNumber(invoice.totalNetPrice),
      totalDiscount: formatNumber(invoice.totalDiscount),
      totalVat: formatNumber(invoice.totalVat),
      totalPrice: formatNumber(invoice.totalPrice),
      totalQuantity: formatNumber(totalQuantity),
      customerNationalNo: safeGet(customer, "business.nationalNo"),
      customerTaxNo: safeGet(customer, "business.taxNo"),
      customerAddress: safeGet(customer, "address.address"),
      customerLocation: safeGet(customer, "address.locationTitle"),
      customerPostalCode: safeGet(customer, "address.postalCode"),
      customerPhone: safeGet(customer, "phone.value"),
      sellerName: comp?.name || "",
      sellerNationalNo: comp?.nationalNo || "",
      sellerTaxNo: comp?.taxNo || "",
      sellerAddress: comp?.address || "",
      sellerLocation: comp?.location || "",
      sellerPostalCode: comp?.postalCode || "",
      sellerPhone: comp?.phone || "",
      logoSrc: logoSrc.value,
      signatureSrc: signatureSrc.value,
      headerTitle: headerTitle.value,
      footerNote: designer.value.footerNote || "",
      taxId: safeGet(invoice, "lastApiLogModel.taxId"),
      remainedPayedAmount: formatNumber(remained.payedAmount),
      remainedAmount: formatNumber(remained.remained),
      remainedOtherRemained: formatNumber(remained.otherRemained),
      remainedTotalRemained: formatNumber(remained.totalRemained),
      items: invoiceItems.map((item) => ({
        rowNo: item.rowNo || "",
        productCode: item.productCode || "",
        productTitle: item.productTitle || "",
        productDisplay: getProductDisplay(item),
        quantity: formatNumber(item.quantity),
        productUnitTitle: item.productUnitTitle || "",
        price: formatNumber(item.price),
        totalPrice: formatNumber(item.totalPrice),
        comment: item.comment || "",
        commentDisplay: item.comment ? `(${item.comment})` : "",
      })),
    };
    return filterTemplateByAttributes(
      renderTemplate(templateHtml.value, templateData),
      designer.value
    );
  });

  const defaultPalette = [
    { field: "rowNo", label: "ردیف" },
    { field: "productCode", label: "کد" },
    { field: "productTitle", label: "شرح کالا/خدمت" },
    { field: "productDisplay", label: "کالا / خدمت" },
    { field: "quantity", label: "تعداد/مقدار" },
    { field: "productUnitTitle", label: "واحد" },
    { field: "price", label: "مبلغ واحد" },
    { field: "totalPrice", label: "جمع کل" },
  ];

  const isColumnSelected = (col) =>
    designer.value.columns.some((c) => c.field === col.field);
  const getColumnIcon = (col) =>
    isColumnSelected(col)
      ? "o_check_circle"
      : "o_radio_button_unchecked";
  const getColumnColor = (col) =>
    isColumnSelected(col) ? "positive" : "grey";
  const toggleColumn = (col) => {
    const index = designer.value.columns.findIndex(
      (c) => c.field === col.field
    );
    index > -1
      ? designer.value.columns.splice(index, 1)
      : designer.value.columns.push({
          field: col.field,
          label: col.label,
        });
  };

  const loadTemplateConfig = async () => {
    try {
      const config =
        appConfigStore.model?.value?.invoiceTableDesigner;
      if (config?.templateHtml)
        templateHtml.value = config.templateHtml;
      if (config?.designer)
        Object.assign(designer.value, config.designer);
    } catch (error) {}
  };
  const loadMediaAssets = async () => {
    try {
      if (!appConfigStore.model.value?.companySetting?.id)
        await appConfigStore.reloadData?.();
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
    } catch (error) {}
  };
  const handleSave = async () => {
    $q.dialog({
      component: CodeOutputDialog,
      componentProps: {
        code: filterTemplateByAttributes(
          templateHtml.value,
          designer.value
        ),
      },
    });
  };

  onMounted(async () => {
    await loadMediaAssets();
    await loadTemplateConfig();
  });
</script>

<style lang="scss">
  .settings-expansion-item .q-item {
    padding: 0 !important;
  }
</style>
