<template>
  <q-card bordered>
    <div v-html="renderedTemplate"></div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { mediaType } from "src/constants";
  import { helper } from "src/helpers";

  const LOGO_SIZE = { width: 120, height: 55 };
  const SIGNATURE_SIZE = { width: 300, height: 200 };

  const { t } = useI18n();
  const appConfigStore = useAppConfigModel();

  const logoSrc = ref("");
  const signatureSrc = ref("");

  const templateHtml = ref(
    `<div class="q-card__section q-card__section--vert q-pb-none" name="header"><table style="width: 100%;"><tbody><tr><td style="width: 25%;" name="logo"><img src="data:image/jpeg;base64, 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" alt="logo"></td><td><div class="text-center text-body2 text-bold">فاکتور</div></td><td style="width: 25%;" name="invoiceInfo"><div><span>شماره:</span><span class="q-px-sm text-weight-600">{{no}}</span></div><div><span>تاریخ:</span><span class="q-px-sm text-weight-600">{{date}}</span></div></td></tr></tbody></table></div><div class="q-card__section q-card__section--vert q-gutter-y-sm"><div class="q-table__middle scroll"><table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody name="sellerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>فروشنده: <strong>{{sellerName}}</strong></div><div>نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span></div></td></tr></tbody></table></div><div class="q-table__middle scroll" name="invoiceItems"><table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 12.4px;"><thead><tr><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">ردیف</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">تعداد/مقدار</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">کالا / خدمت</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">جمع کل (ریال)</th></tr></thead><tbody>{{#items}}<tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td></tr>{{/items}}<tr><td colspan="3" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">سرجمع: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td></tr><tr><td colspan="3" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">تخفیف: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td></tr><tr><td colspan="3" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">ارزش افزوده: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td></tr><tr><td colspan="3" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">جمع مقدار: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalQuantity}}</strong></td></tr><tr><td colspan="3" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong> {{currencyTitle}}</td></tr></tbody></table></div><div class="q-table__middle scroll" name="footer"><table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody><tr name="summary"><td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>شرح</strong><div><strong name="contract">{{contractTitle}}<span style="padding: 5px;"> / </span></strong><span class="text-wrap">{{summary}}</span></div><div class="text-wrap"></div></td></tr><tr name="signature"><td colspan="100%" class="text-body2 vertical-top" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; width: 50%; height: 90px;">مهر و امضا فروشنده <div><img src="data:image/jpeg;base64, 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" alt="signature" style="width: 120px;"></div></td></tr></tbody></table></div></div>`
  );

  const data = ref({
    no: "{{no}}",
    amount: 180.0,
    vatAmount: 0.0,
    discountAmount: 0.0,
    subject: "موضوع صورتحساب",
    summary: "شرح صورتحساب",
    statusTitle: "دائم",
    rowNo: "7463",
    date: "1402/03/11",
    dueDate: "1402/04/10",
    receivedAmount: 858000000.0,
    typeTitle: "نوع فاکتور",
    paymentTypeId: 1,
    customerName: "نام مشتری",
    customerTypeId: 172,
    inventoryTitle: "انبار",
    currencyTitle: "ارز",
    voucherNo: 62,
    invoiceNo: 0,
    contractNo: "ش قرارداد",
    contractTitle: "قرارداد",
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

  const headerTitle = computed(() => {
    if (appConfigStore.model?.value?.companySetting?.invoiceTitle)
      return appConfigStore.model.value.companySetting.invoiceTitle;
    return t("shared.labels.invoice");
  });

  const formatNumber = (value) => {
    if (typeof value === "number")
      return helper.formatNumber(value ?? 0);
    return value ?? 0;
  };

  const replaceVar = (template, key, value) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    return template.replace(
      regex,
      value != null ? String(value) : ""
    );
  };

  const renderTemplate = (tpl, data) => {
    const loopRegex = /\{\{#items\}\}([\s\S]*?)\{\{\/items\}\}/;
    const loopMatch = tpl.match(loopRegex);
    if (loopMatch) {
      const rowTemplate = loopMatch[1];
      const items = data.items || [];
      let itemsHtml = "";
      items.forEach((item) => {
        let rowHtml = rowTemplate;
        Object.keys(item).forEach((key) => {
          rowHtml = replaceVar(rowHtml, key, item[key]);
        });
        itemsHtml += rowHtml;
      });
      tpl = tpl.replace(loopRegex, itemsHtml);
    }

    Object.keys(data).forEach((key) => {
      if (key !== "items") tpl = replaceVar(tpl, key, data[key]);
    });

    return tpl;
  };

  const company = computed(
    () => appConfigStore.model?.value?.companySetting
  );

  const invoiceData = computed(() => {
    const invoice = data.value;
    const remained = invoice.invoiceRemained || {};
    const customer = invoice.customerSummary || {};
    const invoiceItems = invoice.invoiceItems || [];
    let totalQty = 0;
    invoiceItems.forEach((item) => {
      totalQty += item.quantity || 0;
    });
    return {
      invoice,
      remained,
      customer,
      invoiceItems,
      totalQuantity: totalQty,
    };
  });

  const getProductDisplay = (item) => {
    if (item.productDisplay) return item.productDisplay;
    if (item.productCode && item.productTitle)
      return `${item.productCode} - ${item.productTitle}`;
    if (item.productTitle) return item.productTitle;
    if (item.productCode) return item.productCode;
    return "";
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

    let totalNetPrice = 0;
    invoiceItems.forEach((item) => {
      totalNetPrice += item.totalPrice || 0;
    });

    const totalDiscount = invoice.discountAmount || 0;
    const totalVat = invoice.vatAmount || 0;
    const totalPrice = totalNetPrice - totalDiscount + totalVat;

    const templateData = {
      customerName: invoice.customerName || "",
      date: invoice.date || "",
      dueDate: invoice.dueDate || "",
      no: invoice.no || "",
      subject: invoice.subject || "",
      summary: invoice.summary || "",
      contractTitle: invoice.contractTitle || "",
      currencyTitle: invoice.currencyTitle || "ریال",
      totalNetPrice: formatNumber(totalNetPrice),
      totalDiscount: formatNumber(totalDiscount),
      totalVat: formatNumber(totalVat),
      totalPrice: formatNumber(totalPrice),
      totalQuantity: formatNumber(totalQuantity),
      customerNationalNo: customer?.business?.nationalNo ?? "",
      customerTaxNo: customer?.business?.taxNo ?? "",
      customerAddress: customer?.address?.address ?? "",
      customerLocation: customer?.address?.locationTitle ?? "",
      customerPostalCode: customer?.address?.postalCode ?? "",
      customerPhone: customer?.phone?.value ?? "",
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
      footerNote: "",
      taxId: invoice?.lastApiLogModel?.taxId ?? "",
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

    return renderTemplate(templateHtml.value, templateData);
  });

  const loadTemplateConfig = async () => {
    try {
      const config =
        appConfigStore.model?.value?.invoiceTableDesigner;
      if (config?.templateHtml)
        templateHtml.value = config.templateHtml;
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
          LOGO_SIZE.width,
          LOGO_SIZE.height
        ),
        appConfigStore.getAvatar?.(
          mediaType.signature,
          SIGNATURE_SIZE.width,
          SIGNATURE_SIZE.height
        ),
      ]);
      logoSrc.value = logo || "";
      signatureSrc.value = signature || "";
    } catch (error) {}
  };

  onMounted(async () => {
    await loadMediaAssets();
    await loadTemplateConfig();
  });
</script>
