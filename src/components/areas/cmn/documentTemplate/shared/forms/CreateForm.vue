<template>
  <form-toolbar-container
    :title="title"
    @submit-call-back="handleSave"
  />

  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <div class="column q-gutter-md">
          <q-card bordered>
            <q-card-section>
              <custom-input
                :label="$t('shared.labels.templateName')"
                v-model="model.title"
                required
              />
              <div class="column q-gutter-sm q-pt-md">
                <div>
                  <q-checkbox
                    dense
                    size="44px"
                    v-model="model.isDefault"
                    :label="$t('shared.labels.default')"
                  />
                </div>
                <div>
                  <q-checkbox
                    class="q-pb-sm"
                    dense
                    size="44px"
                    v-model="model.isActive"
                    :label="$t('shared.labels.isActive')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card bordered>
            <q-card-section>
              <q-list separator class="rounded-borders">
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
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  icon="o_people"
                  label="فروشنده و خریدار"
                  class="settings-expansion-item"
                >
                  <q-card-section class="column q-py-sm q-px-none">
                    <div class="column q-gutter-sm">
                      <q-checkbox
                        class="q-pb-sm"
                        dense
                        size="44px"
                        v-model="designer.isAdvancedModeSellerBuyer"
                        label="حالت پیشرفته"
                        @update:model-value="
                          onAdvancedModeSellerBuyerChange
                        "
                      />
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
                      <q-checkbox
                        class="q-pb-sm"
                        dense
                        size="44px"
                        v-model="designer.isAdvancedModeInvoiceItems"
                        label="حالت پیشرفته"
                        @update:model-value="
                          onAdvancedModeInvoiceItemsChange
                        "
                      />
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

                    <q-list separator class="rounded-borders q-mt-sm">
                      <template
                        v-for="(
                          col, displayIndex
                        ) in columnsForDisplay"
                        :key="`col-${col.field}-${displayIndex}`"
                      >
                        <q-item
                          :draggable="col.isSelected"
                          :class="{
                            'draggable-item': col.isSelected,
                          }"
                          @dragstart="
                            col.isSelected &&
                              onColumnDragStart(
                                getColumnIndex(col.field),
                                $event
                              )
                          "
                          @dragover.prevent
                          @drop.prevent="
                            col.isSelected &&
                              onColumnDrop(
                                getColumnIndex(col.field),
                                $event
                              )
                          "
                          @dragend="
                            col.isSelected && onColumnDragEnd($event)
                          "
                        >
                          <q-item-section avatar>
                            <q-icon
                              name="o_drag_indicator"
                              color="grey-6"
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>
                              {{ col.label }}
                            </q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-checkbox
                              :model-value="
                                columnCheckboxState[col.field]
                              "
                              @update:model-value="toggleColumn(col)"
                              checked-icon="task_alt"
                              unchecked-icon="panorama_fish_eye"
                              size="md"
                              dense
                              @click.stop
                            />
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
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
  </q-form>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { mediaType } from "src/constants";
  import { helper } from "src/helpers";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";

  // -------------------------
  // Props
  // -------------------------
  const props = defineProps({
    action: String,
    title: String,
  });

  // -------------------------
  // Constants
  // -------------------------
  const LOGO_SIZE = { width: 120, height: 55 };
  const SIGNATURE_SIZE = { width: 300, height: 200 };

  const defaultColumns = [
    { field: "rowNo", label: "ردیف" },
    { field: "productDisplay", label: "کالا / خدمت" },
    { field: "quantity", label: "تعداد/مقدار" },
    { field: "price", label: "مبلغ واحد" },
    { field: "totalPrice", label: "جمع کل (ریال)" },
  ];

  const standardColumns = [
    { field: "rowNo", label: "ردیف" },
    { field: "productCode", label: "کد" },
    { field: "productTitle", label: "عنوان کالا" },
    { field: "quantity", label: "تعداد" },
    { field: "productUnitTitle", label: "واحد" },
    { field: "price", label: "مبلغ واحد" },
    { field: "quantityPrice", label: "جمع کل" },
    { field: "discount", label: "مبلغ تخفیف" },
    { field: "netAmount", label: "مبلغ خالص" },
    { field: "vatAmount", label: "مبلغ مالیات" },
    { field: "totalPrice", label: "جمع کل" },
  ];

  const defaultTemplate = `<div class="q-card__section q-card__section--vert q-pb-none" name="header"><table style="width: 100%;"><tbody><tr><td style="width: 25%;" name="logo"><img src="{{logoSrc}}" alt="logo"></td><td><div class="text-center text-body2 text-bold">{{headerTitle}}</div></td><td style="width: 25%;" name="invoiceInfo"><div><span>شماره:</span><span class="q-px-sm text-weight-600">{{no}}</span></div><div><span>تاریخ:</span><span class="q-px-sm text-weight-600">{{date}}</span></div></td></tr></tbody></table></div><div class="q-card__section q-card__section--vert q-gutter-y-sm"><div class="q-table__middle scroll"><table class="print-preview-table" data-mode="simple" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody name="sellerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>فروشنده: <strong>{{sellerName}}</strong></div><div>نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span></div></td></tr></tbody><tbody name="customerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>مشتری: <strong>{{customerName}}</strong><span> / شناسه ملی: {{customerNationalNo}}</span></div><div>نشانی: <strong>{{customerLocation}} - </strong><span class="text-wrap">{{customerAddress}}</span><span> / <strong>کد پستی:</strong> {{customerPostalCode}}</span></div><div>تلفن: {{customerPhone}}</div></td></tr></tbody></table></div><div class="q-table__middle scroll" name="invoiceItems"><table class="print-preview-table" data-mode="simple" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 12.4px;"><thead><tr><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">ردیف</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">کالا / خدمت</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">تعداد/مقدار</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">مبلغ واحد</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">جمع کل (ریال) </th></tr></thead><tbody>{{#items}}<tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}} <small>({{productUnitTitle}})</small></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{price}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td></tr>{{/items}}<tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">سرجمع: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">تخفیف: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">ارزش افزوده: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">جمع مقدار: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalQuantity}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong> {{currencyTitle}}</td></tr></tbody></table></div><div class="q-table__middle scroll" name="footer"><table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody><tr name="remained"><td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: left;"><span><strong style="padding: 0px 5px;">جمع دریافتی</strong> {{remainedPayedAmount}}</span><span><strong style="padding: 0px 5px;">مانده</strong><span class="text-weight-600">{{remainedAmount}}</span></span><span><strong style="padding: 0px 5px;">مانده از قبل</strong><span class="text-weight-600">{{remainedOtherRemained}}</span></span><span><strong style="padding: 0px 5px;">جمع مانده</strong> {{remainedTotalRemained}}</span></td></tr><tr name="summary"><td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>شرح</strong><div><strong name="contract">{{contractTitle}}<span style="padding: 5px;"> / </span></strong><span class="text-wrap">{{summary}}</span></div><div class="text-wrap">{{footerNote}}</div></td></tr><tr name="signature"><td colspan="100%" class="text-body2 vertical-top" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; width: 50%; height: 90px;">مهر و امضا فروشنده <div><img src="{{signatureSrc}}" alt="signature" style="width: 120px;"></div></td></tr></tbody></table></div></div>`;

  // -------------------------
  // Composables & Stores
  // -------------------------
  const { t } = useI18n();
  const $q = useQuasar();
  const appConfigStore = useAppConfigModel();

  const form = ref(null);
  const model = ref({
    title: "",
    isActive: true,
    isDefault: false,
    body: "",
  });

  const formStore = useBaseInfoModel({
    model: model,
    baseRoute: "cmn/documentTemplate",
  });

  // -------------------------
  // Refs
  // -------------------------
  const logoSrc = ref("");
  const signatureSrc = ref("");
  const draggedColumnIndex = ref(null);
  const isDragging = ref(false);
  const templateHtml = ref("");

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
    columns: [],
    customColumns: [],
    isAdvancedModeSellerBuyer: false,
    isAdvancedModeInvoiceItems: false,
  });

  const previewData = ref({
    no: "{{no}}",
    amount: 10.0,
    vatAmount: 0.0,
    discountAmount: 0.0,
    subject: "{{subject}}",
    summary: "{{summary}}",
    statusTitle: "{{statusTitle}}",
    rowNo: "{{document row no}}",
    date: "{{date}}",
    dueDate: "{{due date}}",
    receivedAmount: 0,
    typeTitle: "{{sales type}}",
    paymentTypeId: 1,
    customerName: "{{customer name}}",
    inventoryTitle: "{{inventory title}}",
    currencyTitle: "{{currency}}",
    voucherNo: "{{voucher no}}",
    contractNo: "{{contract no}}",
    contractTitle: "{{contractTitle}}",
    customerSummary: {
      nationalCode: "{{national code}}",
      address: {
        locationTitle: "{{city}}",
        address: "{{address}}",
        postalCode: "{{post code}}",
        isPrimary: false,
      },
      phone: {
        contactTypeTitle: "{{phone type}}",
        value: "{{phoe number}}",
        isPrimary: false,
      },
      business: {
        taxNo: "{{tax code}}",
        insuranceWorkNo: "{{insurrance no}}",
        nationalNo: "{{tax inn}}",
        regNo: "{{register no}}",
        regDate: "{{resgiter date}}",
      },
    },
    invoiceItems: [
      {
        rowNo: 1,
        quantity: 1.0,
        discountPercent: 0.0,
        discount: 0.0,
        vatPercent: 0.0,
        vatAmount: 0.0,
        price: 10.0,
        totalPrice: 10.0,
        comment: "{{item comment}}",
        productCode: "{{product code}}",
        productTitle: "{{product name}}",
        productDisplay: "{{product full name}}",
        productUnitTitle: "{{product measure unit}}",
        vatTitle: "{{vat type}}",
      },
    ],
    precisionCount: 2,
    displayFormat: 0,
    transportationCost: 0,
    invoiceRemained: {
      amount: 10.0,
      payedAmount: 0.0,
      remained: 0.0,
      otherRemained: 0.0,
      totalRemained: 0.0,
    },
  });

  // Initialize default columns if empty
  if (
    !designer.value.columns ||
    designer.value.columns.length === 0
  ) {
    initializeDefaultColumns();
  }

  // -------------------------
  // Computed
  // -------------------------
  const companyInfo = computed(
    () => appConfigStore.model?.value?.companySetting
  );

  const invoiceData = computed(() => {
    const invoice = previewData.value;
    const remained = invoice.invoiceRemained || {};
    const customer = invoice.customerSummary || {};
    const invoiceItems = invoice.invoiceItems || [];

    const totalQuantity = invoiceItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    return {
      invoice,
      remained,
      customer,
      invoiceItems,
      totalQuantity,
    };
  });

  const allColumns = computed(() => {
    const baseColumns = designer.value.isAdvancedModeInvoiceItems
      ? standardColumns
      : defaultColumns;

    const baseCols = baseColumns.map((col) => ({ ...col }));
    const customCols = (designer.value.customColumns || []).map(
      (col) => ({
        ...col,
      })
    );

    return [...baseCols, ...customCols];
  });

  const columnsForDisplay = computed(() => {
    const selectedFields = new Set(
      designer.value.columns.map((c) => c.field)
    );

    const dragOrderMap = new Map(
      designer.value.columns.map((col, index) => [col.field, index])
    );

    const result = [];
    let currentIndex = 0;

    while (currentIndex < allColumns.value.length) {
      const column = allColumns.value[currentIndex];

      if (selectedFields.has(column.field)) {
        const consecutiveSelected = collectConsecutiveSelected(
          currentIndex,
          selectedFields
        );

        const sortedSelected = sortColumnsByDragOrder(
          consecutiveSelected,
          dragOrderMap
        );

        result.push(...sortedSelected);
        currentIndex += consecutiveSelected.length;
      } else {
        result.push({
          ...column,
          isSelected: false,
        });
        currentIndex++;
      }
    }

    return result;
  });

  function collectConsecutiveSelected(startIndex, selectedFields) {
    const consecutive = [];
    let index = startIndex;

    while (
      index < allColumns.value.length &&
      selectedFields.has(allColumns.value[index].field)
    ) {
      consecutive.push(allColumns.value[index]);
      index++;
    }

    return consecutive;
  }

  function sortColumnsByDragOrder(columns, dragOrderMap) {
    return columns
      .map((col) => {
        const selectedCol = designer.value.columns.find(
          (sc) => sc.field === col.field
        );
        return {
          ...col,
          ...(selectedCol || {}),
          isSelected: true,
          dragIndex: dragOrderMap.get(col.field),
        };
      })
      .sort((a, b) => a.dragIndex - b.dragIndex);
  }

  const columnCheckboxState = computed(() => {
    const selectedFields = new Set(
      designer.value.columns.map((c) => c.field)
    );

    return allColumns.value.reduce((state, col) => {
      state[col.field] = selectedFields.has(col.field);
      return state;
    }, {});
  });

  const renderedTemplate = computed(() => {
    const {
      invoice,
      remained,
      customer,
      invoiceItems,
      totalQuantity,
    } = invoiceData.value;
    const company = companyInfo.value;

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
      totalPriceWithoutVat: formatNumber(
        (invoice.totalPrice || 0) - (invoice.totalVat || 0)
      ),
      totalQuantity: formatNumber(totalQuantity),
      customerNationalNo: customer?.business?.nationalNo ?? "",
      customerTaxNo: customer?.business?.taxNo ?? "",
      customerRegNo: customer?.business?.regNo ?? "",
      customerAddress: customer?.address?.address ?? "",
      customerLocation: customer?.address?.locationTitle ?? "",
      customerPostalCode: customer?.address?.postalCode ?? "",
      customerPhone: customer?.phone?.value ?? "",
      sellerName: company?.name || "",
      sellerNationalNo: company?.nationalNo || "",
      sellerTaxNo: company?.taxNo || "",
      sellerRegNo: company?.regNo || "",
      sellerAddress: company?.address || "",
      sellerLocation: company?.location || "",
      sellerPostalCode: company?.postalCode || "",
      sellerPhone: company?.phone || "",
      logoSrc: logoSrc.value,
      signatureSrc: signatureSrc.value,
      taxId: invoice?.lastApiLogModel?.taxId ?? "",
      remainedPayedAmount: formatNumber(remained.payedAmount),
      remainedAmount: formatNumber(remained.remained),
      remainedOtherRemained: formatNumber(remained.otherRemained),
      remainedTotalRemained: formatNumber(remained.totalRemained),
      items: invoiceItems.map((item) => {
        const baseItem = {
          rowNo: item.rowNo || "",
          productCode: item.productCode || "",
          productTitle: item.productTitle || "",
          productDisplay: getProductDisplayText(item),
          productTaxCode: item.productTaxCode || "",
          quantity: formatNumber(item.quantity),
          productUnitTitle: item.productUnitTitle || "",
          price: formatNumber(item.price),
          quantityPrice: formatNumber(
            (item.quantity || 0) * (item.price || 0)
          ),
          discount: formatNumber(item.discount || 0),
          netAmount: formatNumber(
            (item.quantity || 0) * (item.price || 0) -
              (item.discount || 0)
          ),
          vatAmount: formatNumber(item.vatAmount || 0),
          totalPrice: formatNumber(item.totalPrice),
          comment: item.comment || "",
          productComment: item.productComment || "",
          commentDisplay: item.comment ? `(${item.comment})` : "",
        };

        Object.keys(item).forEach((key) => {
          if (!baseItem.hasOwnProperty(key)) {
            const value = item[key];
            baseItem[key] =
              typeof value === "number"
                ? formatNumber(value)
                : value || "";
          }
        });

        return baseItem;
      }),
    };

    let html = renderTemplateWithData(
      templateHtml.value,
      templateData
    );
    html = applyVisibilitySettings(html, designer.value);

    return html;
  });

  // -------------------------
  // Helper Functions
  // -------------------------
  function formatNumber(value) {
    if (typeof value === "number") {
      return helper.formatNumber(value ?? 0);
    }
    return value ?? 0;
  }

  function replaceTemplateVariable(template, key, value) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    return template.replace(
      regex,
      value != null ? String(value) : ""
    );
  }

  function getProductDisplayText(item) {
    if (item.productDisplay) return item.productDisplay;
    if (item.productCode && item.productTitle) {
      return `${item.productCode} - ${item.productTitle}`;
    }
    if (item.productTitle) return item.productTitle;
    if (item.productCode) return item.productCode;
    return "";
  }

  function getColumnIndex(field) {
    return designer.value.columns.findIndex((c) => c.field === field);
  }

  function initializeDefaultColumns() {
    designer.value.columns = defaultColumns.map((col) => ({
      field: col.field,
      label: col.label,
    }));
  }

  // -------------------------
  // Template Processing Functions
  // -------------------------
  function buildTableWithSelectedColumns(template) {
    const selectedColumns = designer.value.columns || [];
    if (selectedColumns.length === 0) return template;

    const tablePattern =
      /(<div[^>]*name=["']invoiceItems["'][^>]*>[\s\S]*?<table[^>]*>)([\s\S]*?)(<\/table>[\s\S]*?<\/div>)/;
    const match = template.match(tablePattern);
    if (!match) return template;

    const tableStart = match[1];
    const tableContent = match[2];
    const tableEnd = match[3];

    // Check if in standard mode
    const isStandardMode = tableStart.includes(
      'data-mode="standard"'
    );

    let bodyCellsHtml = "";
    selectedColumns.forEach((col) => {
      if (col.field === "productDisplay") {
        bodyCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td>`;
      } else if (col.field === "productCode") {
        bodyCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{productCode}}<small>{{productTaxCode}}</small></td>`;
      } else if (col.field === "productTitle") {
        bodyCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productTitle}}<small>({{comment}}{{productComment}})</small></div></td>`;
      } else {
        bodyCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{${col.field}}}</td>`;
      }
    });

    if (isStandardMode) {
      // Standard mode: header row is in tbody, and there's a thead with title
      const theadTitle = `<thead><tr class="text-center"><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;" colspan="100%"><div class="text-body2 text-weight-500">جزئیات کالا / خدمت</div></th></tr></thead>`;

      let headerRowHtml = "";
      selectedColumns.forEach(
        (col) =>
          (headerRowHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">${col.label}</td>`)
      );

      const tbodyMatch = tableContent.match(
        /(<tbody>)([\s\S]*?)(<\/tbody>)/
      );
      if (tbodyMatch) {
        // For standard mode, create a clean summary row (don't extract from template to avoid orphaned }})
        // Calculate colspan for label column
        const valueColumnsCount = selectedColumns.length;
        const labelColspan = Math.max(1, valueColumnsCount - 5);

        // Create standard summary row with proper columns
        // Map selected columns to summary values
        let summaryCellsHtml = "";
        let cellIndex = 0;
        selectedColumns.forEach((col) => {
          if (cellIndex === 0) {
            // First visible column: label with colspan
            summaryCellsHtml += `<td colspan="${labelColspan}" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong> ({{currencyTitle}})</td>`;
            cellIndex += labelColspan;
          }

          // Add value cells for summary columns
          if (
            col.field === "quantityPrice" ||
            col.field === "price" ||
            col.field === "rowNo" ||
            col.field === "productCode" ||
            col.field === "productTitle" ||
            col.field === "quantity" ||
            col.field === "productUnitTitle"
          ) {
            // Skip these columns in summary (already handled by colspan or not needed)
            return;
          } else if (
            col.field === "totalPrice" &&
            cellIndex >= labelColspan
          ) {
            summaryCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong></td>`;
            cellIndex++;
          } else if (
            col.field === "discount" &&
            cellIndex >= labelColspan
          ) {
            summaryCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td>`;
            cellIndex++;
          } else if (
            col.field === "netAmount" &&
            cellIndex >= labelColspan
          ) {
            summaryCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPriceWithoutVat}}</strong></td>`;
            cellIndex++;
          } else if (
            col.field === "vatAmount" &&
            cellIndex >= labelColspan
          ) {
            summaryCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td>`;
            cellIndex++;
          } else if (cellIndex >= labelColspan) {
            // For other columns that are after label colspan, add empty cell
            summaryCellsHtml += `<td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"></td>`;
            cellIndex++;
          }
        });

        // Create standard summary row
        const standardSummaryRow = `<tr>${summaryCellsHtml}</tr>`;

        const newTbody = `<tbody><tr>${headerRowHtml}</tr>{{#items}}<tr>${bodyCellsHtml}</tr>{{/items}}${standardSummaryRow}</tbody>`;
        const newTableContent = `${theadTitle}${newTbody}`;

        // Ensure data-mode is preserved in tableStart
        let finalTableStart = tableStart;
        if (!finalTableStart.includes("data-mode=")) {
          finalTableStart = finalTableStart.replace(
            /<table([^>]*)>/,
            '<table$1 data-mode="standard">'
          );
        } else if (
          !finalTableStart.includes('data-mode="standard"')
        ) {
          finalTableStart = finalTableStart.replace(
            /data-mode=["']simple["']/,
            'data-mode="standard"'
          );
        }

        return template.replace(
          tablePattern,
          `${finalTableStart}${newTableContent}${tableEnd}`
        );
      }
    } else {
      // Simple mode: header row is in thead
      let headerHtml = "";
      selectedColumns.forEach(
        (col) =>
          (headerHtml += `<th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">${col.label}</th>`)
      );

      let newTableContent = tableContent.replace(
        /<thead>[\s\S]*?<\/thead>/,
        `<thead><tr>${headerHtml}</tr></thead>`
      );

      const tbodyMatch = newTableContent.match(
        /(<tbody>)([\s\S]*?)(<\/tbody>)/
      );
      if (tbodyMatch) {
        const tbodyContent = tbodyMatch[2];
        const itemsEndPos = tbodyContent.indexOf("{{/items}}");
        const summaryHtml = tbodyContent.substring(itemsEndPos + 9);

        const summaryRows =
          summaryHtml.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
        const fixedSummaryRows = summaryRows.map((row) => {
          return row.replace(
            /colspan=["']?(\d+)["']?/g,
            (match, num) => {
              if (num === "100") return match;
              const newColspan = Math.max(
                1,
                selectedColumns.length - 1
              );
              return `colspan="${newColspan}"`;
            }
          );
        });

        const newTbody = `<tbody>{{#items}}<tr>${bodyCellsHtml}</tr>{{/items}}${fixedSummaryRows.join(
          ""
        )}</tbody>`;
        newTableContent = newTableContent.replace(
          /<tbody>[\s\S]*?<\/tbody>/,
          newTbody
        );
      }

      // Ensure data-mode is preserved in tableStart for simple mode
      let finalTableStart = tableStart;
      if (!finalTableStart.includes("data-mode=")) {
        finalTableStart = finalTableStart.replace(
          /<table([^>]*)>/,
          '<table$1 data-mode="simple">'
        );
      } else if (!finalTableStart.includes('data-mode="simple"')) {
        finalTableStart = finalTableStart.replace(
          /data-mode=["']standard["']/,
          'data-mode="simple"'
        );
      }

      return template.replace(
        tablePattern,
        `${finalTableStart}${newTableContent}${tableEnd}`
      );
    }
  }

  function renderTemplateWithData(template, data) {
    // Always build table with selected columns (works for both simple and standard modes)
    template = buildTableWithSelectedColumns(template);

    const itemsLoopRegex = /\{\{#items\}\}([\s\S]*?)\{\{\/items\}\}/;
    const itemsLoopMatch = template.match(itemsLoopRegex);
    if (itemsLoopMatch) {
      const rowTemplate = itemsLoopMatch[1];
      const items = data.items || [];
      let itemsHtml = "";

      items.forEach((item) => {
        let rowHtml = rowTemplate;
        Object.keys(item).forEach((key) => {
          rowHtml = replaceTemplateVariable(rowHtml, key, item[key]);
        });
        itemsHtml += rowHtml;
      });

      template = template.replace(itemsLoopRegex, itemsHtml);
    }

    Object.keys(data).forEach((key) => {
      if (key !== "items") {
        template = replaceTemplateVariable(template, key, data[key]);
      }
    });

    // Clean up only orphaned braces (}} or {{ without proper pairing)
    // Keep valid Mustache variables like {{no}}, {{date}}, etc. for preview
    // Strategy: Remove orphaned }} that appear without a matching {{
    // We'll do this by finding }} that are not preceded by {{
    // First, mark all valid {{variable}} patterns temporarily
    const validPatterns = [];
    let patternIndex = 0;
    template = template.replace(/\{\{[^}]*\}\}/g, (match) => {
      const placeholder = `__VALID_PATTERN_${patternIndex}__`;
      validPatterns.push(match);
      patternIndex++;
      return placeholder;
    });

    // Now remove orphaned }} and {{
    template = template.replace(/\}\}/g, "");
    template = template.replace(/\{\{/g, "");

    // Restore valid patterns
    validPatterns.forEach((pattern, index) => {
      template = template.replace(
        `__VALID_PATTERN_${index}__`,
        pattern
      );
    });

    return template;
  }

  function toggleHiddenAttribute(html, elementName, shouldHide) {
    let result = html;
    let previousResult = "";

    while (result !== previousResult) {
      previousResult = result;

      const elementPattern = new RegExp(
        `<([a-zA-Z]+)([^>]*?)\\s+name=["']${elementName}["']([^>]*?)>`,
        "gi"
      );
      const match = elementPattern.exec(result);
      if (!match) break;

      const tagName = match[1];
      const attributesBeforeName = match[2].trim();
      const attributesAfterName = match[3].trim();
      const fullMatch = match[0];
      const matchStartPosition = match.index;

      const allAttributes = (
        attributesBeforeName +
        " " +
        attributesAfterName
      ).trim();
      const alreadyHasHidden = /\bhidden\b/i.test(allAttributes);

      if (shouldHide && !alreadyHasHidden) {
        const newTag = `<${tagName}${
          attributesBeforeName ? " " + attributesBeforeName : ""
        } name="${elementName}"${
          attributesAfterName ? " " + attributesAfterName : ""
        } hidden>`;
        result =
          result.substring(0, matchStartPosition) +
          newTag +
          result.substring(matchStartPosition + fullMatch.length);
        elementPattern.lastIndex = 0;
      } else if (!shouldHide && alreadyHasHidden) {
        let cleanedAttributes = allAttributes
          .replace(/\bhidden\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
        const newTag = `<${tagName}${
          cleanedAttributes ? " " + cleanedAttributes : ""
        } name="${elementName}">`;
        result =
          result.substring(0, matchStartPosition) +
          newTag +
          result.substring(matchStartPosition + fullMatch.length);
        elementPattern.lastIndex = 0;
      } else {
        break;
      }
    }
    return result;
  }

  function applyVisibilitySettings(html, settings) {
    let processedHtml = html;

    const sectionToSettingMap = {
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

    Object.entries(sectionToSettingMap).forEach(
      ([sectionName, shouldShow]) => {
        processedHtml = toggleHiddenAttribute(
          processedHtml,
          sectionName,
          !shouldShow
        );
      }
    );

    return processedHtml;
  }

  // -------------------------
  // Advanced Mode Functions
  // -------------------------
  function convertSellerBuyerToStandard(template) {
    // Find the seller/buyer table (the first table with font-size: 13px)
    const sellerBuyerPattern =
      /(<div[^>]*class=["']q-table__middle scroll["'][^>]*>[\s\S]*?<table[^>]*class=["']print-preview-table["'][^>]*style=["'][^"']*font-size:\s*13px[^"']*["'][^>]*>)([\s\S]*?)(<\/table>[\s\S]*?<\/div>)/;
    const match = template.match(sellerBuyerPattern);
    if (!match) return template;

    const tableStart = match[1];
    const tableContent = match[2];
    const tableEnd = match[3];

    // Check if already in standard mode
    if (tableStart.includes('data-mode="standard"')) return template;

    // Create standard mode structure based on standard/_HeaderSale.vue
    const standardTableContent = `<tbody name="sellerInfo"><tr class="text-center"><th style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;" colspan="100%"><div class="text-body2 text-weight-500">فروشنده</div></th></tr><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">نام: <strong>{{sellerName}}</strong></td><td style="width: 15%; border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شماره ثبت: {{sellerRegNo}}</td><td style="width: 21%; border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شماره مالیاتی: {{sellerTaxNo}}</td><td style="width: 20%; border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شناسه ملی: {{sellerNationalNo}}</td></tr><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;" colspan="2">نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span></td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">کد پستی: {{sellerPostalCode}}</td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">تلفن: {{sellerPhone}}</td></tr></tbody><tbody name="customerInfo"><tr class="text-center"><th style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;" colspan="100%"><div class="text-body2 text-weight-500">مشتری</div></th></tr><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">نام: <strong>{{customerName}}</strong></td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شماره ثبت: {{customerRegNo}}</td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شماره مالیاتی: {{customerTaxNo}}</td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">شناسه ملی: {{customerNationalNo}}</td></tr><tr><td colspan="2" style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">نشانی: <strong>{{customerLocation}} - </strong><span class="text-wrap">{{customerAddress}}</span></td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">کد پستی: {{customerPostalCode}}</td><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;">تلفن: {{customerPhone}}</td></tr></tbody>`;

    let newTableStart = tableStart.replace(
      /data-mode=["']simple["']/,
      'data-mode="standard"'
    );
    if (!newTableStart.includes("data-mode=")) {
      newTableStart = newTableStart.replace(
        /<table([^>]*)>/,
        '<table$1 data-mode="standard">'
      );
    }

    return template.replace(
      sellerBuyerPattern,
      `${newTableStart}${standardTableContent}${tableEnd}`
    );
  }

  function convertSellerBuyerToSimple(template) {
    const sellerBuyerPattern =
      /(<div[^>]*class=["']q-table__middle scroll["'][^>]*>[\s\S]*?<table[^>]*class=["']print-preview-table["'][^>]*style=["'][^"']*font-size:\s*13px[^"']*["'][^>]*>)([\s\S]*?)(<\/table>[\s\S]*?<\/div>)/;
    const match = template.match(sellerBuyerPattern);
    if (!match) return template;

    const tableStart = match[1];
    const tableContent = match[2];
    const tableEnd = match[3];

    // Check if already in simple mode
    if (tableStart.includes('data-mode="simple"')) return template;

    // Create simple mode structure based on simple/_HeaderSale.vue
    const simpleTableContent = `<tbody name="sellerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>فروشنده: <strong>{{sellerName}}</strong><span> / شناسه ملی: {{sellerNationalNo}}</span></div><div>نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span><span> / <strong>کد پستی:</strong> {{sellerPostalCode}}</span><span>تلفن: {{sellerPhone}}</span></div></td></tr></tbody><tbody name="customerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>مشتری: <strong>{{customerName}}</strong><span> / شناسه ملی: {{customerNationalNo}}</span></div><div>نشانی: <strong>{{customerLocation}} - </strong><span class="text-wrap">{{customerAddress}}</span><span> / <strong>کد پستی:</strong> {{customerPostalCode}}</span></div><div>تلفن: {{customerPhone}}</div></td></tr></tbody>`;

    let newTableStart = tableStart.replace(
      /data-mode=["']standard["']/,
      'data-mode="simple"'
    );
    if (!newTableStart.includes("data-mode=")) {
      newTableStart = newTableStart.replace(
        /<table([^>]*)>/,
        '<table$1 data-mode="simple">'
      );
    }

    return template.replace(
      sellerBuyerPattern,
      `${newTableStart}${simpleTableContent}${tableEnd}`
    );
  }

  function convertInvoiceItemsToStandard(template) {
    const itemsPattern =
      /(<div[^>]*name=["']invoiceItems["'][^>]*>[\s\S]*?<table[^>]*class=["']print-preview-table["'][^>]*>)([\s\S]*?)(<\/table>[\s\S]*?<\/div>)/;
    const match = template.match(itemsPattern);
    if (!match) return template;

    const tableStart = match[1];
    const tableContent = match[2];
    const tableEnd = match[3];

    // Always convert - don't check if already in standard mode
    // This ensures the template is always in the correct state

    // Create standard mode header and body based on standard/_BodySection.vue
    const standardHeader = `<thead><tr class="text-center"><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;" colspan="100%"><div class="text-body2 text-weight-500">جزئیات کالا / خدمت</div></th></tr></thead>`;
    const standardBodyHeader = `<tbody><tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">ردیف</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">کد</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">عنوان کالا</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">تعداد</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">واحد</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">مبلغ واحد</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">جمع کل</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">مبلغ تخفیف</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">مبلغ خالص</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">مبلغ مالیات</td><td style="min-width: 100px; padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">جمع کل <span class="text-weight-700">({{currencyTitle}})</span></td></tr>`;
    const standardBodyRows = `{{#items}}<tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{productCode}}<small>{{productTaxCode}}</small></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productTitle}}<small>({{comment}}{{productComment}})</small></div></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{productUnitTitle}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{price}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantityPrice}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{discount}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{netAmount}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{vatAmount}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td></tr>{{/items}}`;

    // Create standard mode summary row - single row with all totals
    // Based on standard/_BodySection.vue structure
    const standardSummaryRow = `<tr><td colspan="6" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong> ({{currencyTitle}})</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPriceWithoutVat}}</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong></td></tr>`;

    const newTableContent = `${standardHeader}${standardBodyHeader}${standardBodyRows}${standardSummaryRow}</tbody>`;
    let newTableStart = tableStart.replace(
      /data-mode=["']simple["']/,
      'data-mode="standard"'
    );
    if (!newTableStart.includes("data-mode=")) {
      newTableStart = newTableStart.replace(
        /<table([^>]*)>/,
        '<table$1 data-mode="standard">'
      );
    }

    // Set default columns for standard mode
    designer.value.columns = standardColumns.map((col) => ({
      field: col.field,
      label: col.label,
    }));

    return template.replace(
      itemsPattern,
      `${newTableStart}${newTableContent}${tableEnd}`
    );
  }

  function convertInvoiceItemsToSimple(template) {
    const itemsPattern =
      /(<div[^>]*name=["']invoiceItems["'][^>]*>[\s\S]*?<table[^>]*class=["']print-preview-table["'][^>]*>)([\s\S]*?)(<\/table>[\s\S]*?<\/div>)/;
    const match = template.match(itemsPattern);
    if (!match) return template;

    const tableStart = match[1];
    const tableContent = match[2];
    const tableEnd = match[3];

    // Always convert - don't check if already in simple mode
    // This ensures the template is always in the correct state

    // Create simple mode structure - rebuild summary rows completely
    const simpleHeader = `<thead><tr><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">ردیف</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">کالا / خدمت</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">تعداد/مقدار</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">مبلغ واحد</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">جمع کل (ریال)</th></tr></thead>`;
    const simpleBodyRows = `{{#items}}<tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}} <small>({{productUnitTitle}})</small></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{price}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td></tr>{{/items}}`;

    // Create simple mode summary rows based on simple/_BodySection.vue
    // Multiple rows with colspan="4" for label column (5 columns total, so colspan is 4)
    const simpleSummaryRows = `<tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">سرجمع: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">تخفیف: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">ارزش افزوده: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">جمع مقدار: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalQuantity}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong> {{currencyTitle}}</td></tr>`;

    const newTableContent = `${simpleHeader}<tbody>${simpleBodyRows}${simpleSummaryRows}</tbody>`;
    const newTableStart = tableStart
      .replace(/data-mode=["']standard["']/, 'data-mode="simple"')
      .replace(/<table([^>]*)>/, '<table$1 data-mode="simple">');

    // Set default columns for simple mode
    initializeDefaultColumns();

    return template.replace(
      itemsPattern,
      `${newTableStart}${newTableContent}${tableEnd}`
    );
  }

  function onAdvancedModeSellerBuyerChange(value) {
    if (value) {
      templateHtml.value = convertSellerBuyerToStandard(
        templateHtml.value
      );
    } else {
      templateHtml.value = convertSellerBuyerToSimple(
        templateHtml.value
      );
    }
  }

  function onAdvancedModeInvoiceItemsChange(value) {
    // Force conversion by temporarily removing data-mode to ensure it always converts
    const tempTemplate = templateHtml.value.replace(
      /data-mode=["'](standard|simple)["']/g,
      ""
    );

    templateHtml.value = value
      ? convertInvoiceItemsToStandard(tempTemplate)
      : convertInvoiceItemsToSimple(tempTemplate);
  }

  // -------------------------
  // Column Management Functions
  // -------------------------
  function toggleColumn(col) {
    if (isDragging.value) return;

    const currentIndex = getColumnIndex(col.field);

    if (currentIndex > -1) {
      designer.value.columns.splice(currentIndex, 1);
    } else {
      const insertIndex = findInsertIndexForColumn(col.field);
      designer.value.columns.splice(insertIndex, 0, {
        field: col.field,
        label: col.label,
      });
    }
  }

  function findInsertIndexForColumn(field) {
    const allColIndex = allColumns.value.findIndex(
      (c) => c.field === field
    );

    for (let i = allColIndex - 1; i >= 0; i--) {
      const previousColumn = allColumns.value[i];
      const previousColumnIndex = getColumnIndex(
        previousColumn.field
      );

      if (previousColumnIndex > -1) {
        return previousColumnIndex + 1;
      }
    }

    return 0;
  }

  function onColumnDragStart(index, event) {
    if (index === -1) return;
    isDragging.value = true;
    draggedColumnIndex.value = index;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.currentTarget);
    if (event.currentTarget) {
      event.currentTarget.style.opacity = "0.5";
      event.currentTarget.classList.add("dragging");
    }
  }

  function onColumnDrop(dropIndex, event) {
    event.preventDefault();
    event.stopPropagation();
    if (draggedColumnIndex.value === null || dropIndex === -1) return;

    const draggedIndex = draggedColumnIndex.value;
    if (draggedIndex === dropIndex) {
      draggedColumnIndex.value = null;
      return;
    }

    const draggedColumn = designer.value.columns[draggedIndex];
    designer.value.columns.splice(draggedIndex, 1);
    const adjustedDropIndex =
      draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    designer.value.columns.splice(
      adjustedDropIndex,
      0,
      draggedColumn
    );
    draggedColumnIndex.value = null;
  }

  function onColumnDragEnd(event) {
    if (event.currentTarget) {
      event.currentTarget.style.opacity = "1";
      event.currentTarget.classList.remove("dragging");
    }
    draggedColumnIndex.value = null;
    setTimeout(() => {
      isDragging.value = false;
    }, 100);
  }

  // -------------------------
  // Template Loading Functions
  // -------------------------
  function extractColumnsFromTemplate(template) {
    const tablePattern =
      /<div[^>]*name=["']invoiceItems["'][^>]*>[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>[\s\S]*?<\/div>/;
    const match = template.match(tablePattern);
    if (!match) return null;

    const tableContent = match[1];
    const tableStart = match[0];
    const isStandardMode = tableStart.includes(
      'data-mode="standard"'
    );

    let columnLabels = [];

    if (isStandardMode) {
      // In standard mode, header row is in tbody (first row after thead title)
      const tbodyMatch = tableContent.match(
        /<tbody>([\s\S]*?)<\/tbody>/
      );
      if (!tbodyMatch) return null;

      const tbodyContent = tbodyMatch[1];
      // Find first <tr> in tbody (header row)
      const headerRowMatch = tbodyContent.match(
        /<tr[^>]*>([\s\S]*?)<\/tr>/
      );
      if (!headerRowMatch) return null;

      const headerRowContent = headerRowMatch[1];
      const tdMatches = headerRowContent.matchAll(
        /<td[^>]*>([\s\S]*?)<\/td>/g
      );
      for (const tdMatch of tdMatches) {
        const label = tdMatch[1].trim();
        if (label) columnLabels.push(label);
      }
    } else {
      // In simple mode, header row is in thead
      const theadMatch = tableContent.match(
        /<thead>[\s\S]*?<\/thead>/
      );
      if (!theadMatch) return null;

      const theadContent = theadMatch[0];
      const thMatches = theadContent.matchAll(
        /<th[^>]*>([\s\S]*?)<\/th>/g
      );
      for (const thMatch of thMatches) {
        const label = thMatch[1].trim();
        if (label) columnLabels.push(label);
      }
    }

    if (columnLabels.length === 0) return null;

    const tbodyMatch = tableContent.match(/<tbody>[\s\S]*?<\/tbody>/);
    if (!tbodyMatch) return null;

    const tbodyContent = tbodyMatch[0];
    const itemsRowMatch = tbodyContent.match(
      /\{\{#items\}\}([\s\S]*?)\{\{\/items\}\}/
    );
    if (!itemsRowMatch) return null;

    const rowTemplate = itemsRowMatch[1];
    const tdMatches = rowTemplate.matchAll(
      /<td[^>]*>([\s\S]*?)<\/td>/g
    );
    const fieldNames = [];
    for (const tdMatch of tdMatches) {
      const tdContent = tdMatch[1];
      if (tdContent.includes("{{productDisplay}}")) {
        fieldNames.push("productDisplay");
      } else {
        const fieldMatch = tdContent.match(/\{\{([^}]+)\}\}/);
        if (fieldMatch) {
          const fieldName = fieldMatch[1].trim();
          if (fieldName !== "commentDisplay") {
            fieldNames.push(fieldName);
          }
        }
      }
    }

    const extractedColumns = [];
    columnLabels.forEach((label, index) => {
      let matchedColumn = allColumns.value.find(
        (col) => col.label === label
      );

      if (!matchedColumn && fieldNames[index]) {
        matchedColumn = allColumns.value.find(
          (col) => col.field === fieldNames[index]
        );
      }

      if (!matchedColumn) {
        matchedColumn = allColumns.value.find(
          (col) => col.label.trim() === label.trim()
        );
      }

      if (matchedColumn) {
        extractedColumns.push({
          field: matchedColumn.field,
          label: matchedColumn.label,
        });
      }
    });

    return extractedColumns.length > 0 ? extractedColumns : null;
  }

  async function loadTemplateConfig() {
    templateHtml.value = model?.value?.body || defaultTemplate;

    const template = templateHtml.value;

    const sectionNameToSettingMap = {
      header: "showHeader",
      logo: "showLogo",
      invoiceInfo: "showInvoiceInfo",
      sellerInfo: "showSellerInfo",
      customerInfo: "showCustomerInfo",
      invoiceItems: "showInvoiceItems",
      remained: "showRemained",
      contract: "showContract",
      summary: "showSummary",
      signature: "showSignature",
      footer: "showFooter",
    };

    Object.entries(sectionNameToSettingMap).forEach(
      ([sectionName, settingKey]) => {
        const elementPattern = new RegExp(
          `<[^>]*\\s+name=["']${sectionName}["'][^>]*>`,
          "i"
        );
        const match = template.match(elementPattern);
        if (match) {
          const hasHidden = /hidden(?:\s|>|$)/i.test(match[0]);
          designer.value[settingKey] = !hasHidden;
        }
      }
    );

    // Check data-mode for seller/buyer table
    const sellerBuyerTableMatch = template.match(
      /<table[^>]*class=["']print-preview-table["'][^>]*style=["'][^"']*font-size:\s*13px[^"']*["'][^>]*>/
    );
    if (sellerBuyerTableMatch) {
      const tableTag = sellerBuyerTableMatch[0];
      const modeMatch = tableTag.match(
        /data-mode=["'](standard|simple)["']/
      );
      if (modeMatch) {
        designer.value.isAdvancedModeSellerBuyer =
          modeMatch[1] === "standard";
      }
    }

    // Check data-mode for invoice items table
    const invoiceItemsTableMatch = template.match(
      /<div[^>]*name=["']invoiceItems["'][^>]*>[\s\S]*?<table[^>]*class=["']print-preview-table["'][^>]*>/
    );
    if (invoiceItemsTableMatch) {
      const tableTagMatch =
        invoiceItemsTableMatch[0].match(/<table[^>]*>/);
      if (tableTagMatch) {
        const tableTag = tableTagMatch[0];
        const modeMatch = tableTag.match(
          /data-mode=["'](standard|simple)["']/
        );
        if (modeMatch) {
          designer.value.isAdvancedModeInvoiceItems =
            modeMatch[1] === "standard";
        }
      }
    }

    const extractedColumns = extractColumnsFromTemplate(template);
    if (extractedColumns && extractedColumns.length > 0) {
      designer.value.columns = extractedColumns;
    } else if (
      !designer.value.columns ||
      designer.value.columns.length === 0
    ) {
      initializeDefaultColumns();
    }
  }

  async function loadMediaAssets() {
    try {
      if (!appConfigStore.model.value?.companySetting?.id) {
        await appConfigStore.reloadData?.();
      }
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
    } catch (error) {
      // Silently handle errors
    }
  }

  // -------------------------
  // Event Handlers
  // -------------------------
  async function handleSave() {
    let finalTemplate = buildTableWithSelectedColumns(
      templateHtml.value
    );
    finalTemplate = applyVisibilitySettings(
      finalTemplate,
      designer.value
    );
    finalTemplate = replaceTemplateVariable(
      finalTemplate,
      "logoSrc",
      logoSrc.value || ""
    );
    finalTemplate = replaceTemplateVariable(
      finalTemplate,
      "signatureSrc",
      signatureSrc.value || ""
    );

    model.value.body = finalTemplate;
    formStore.submitForm(form.value, props.action);
  }

  // -------------------------
  // Lifecycle
  // -------------------------
  onMounted(async () => {
    await loadMediaAssets();
    await loadTemplateConfig();
  });
</script>

<style lang="scss">
  .settings-expansion-item .q-item {
    padding: 0 !important;
  }

  .draggable-item {
    cursor: grab !important;

    &:active,
    &.dragging {
      cursor: grabbing !important;
    }
  }

  [hidden] {
    display: none !important;
  }
</style>
