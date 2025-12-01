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
            <q-expansion-item
              icon="o_view_stream"
              label="ستون‌ها"
              class="settings-expansion-item"
            >
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
              class="settings-expansion-item"
            >
              <div class="column">
                <q-separator size="1px" spaced />
                <div class="text-subtitle2 text-weight-bold q-pb-md">
                  بخش هدر فاکتور
                </div>
                <div class="column q-gutter-sm q-pb-md">
                  <q-toggle
                    dense
                    v-model="designer.showHeader"
                    label="نمایش هدر"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showLogo"
                    label="نمایش لوگو"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showInvoiceInfo"
                    label="نمایش شماره و تاریخ"
                  />
                </div>
                <q-input
                  v-model="designer.headerTitle"
                  dense
                  outlined
                  label="عنوان هدر"
                />

                <q-separator size="1px" spaced />
                <div class="text-subtitle2 text-weight-bold q-pb-md">
                  بخش اطلاعات اصلی
                </div>
                <div class="column q-gutter-sm">
                  <q-toggle
                    dense
                    v-model="designer.showSellerInfo"
                    label="نمایش اطلاعات فروشنده"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showCustomerInfo"
                    label="نمایش اطلاعات خریدار"
                  />
                </div>

                <q-separator size="1px" spaced />
                <div class="text-subtitle2 text-weight-bold q-pb-md">
                  بخش اقلام فاکتور
                </div>
                <div class="column q-gutter-sm q-pb-md">
                  <q-toggle
                    dense
                    v-model="designer.showInvoiceItems"
                    label="نمایش اقلام فاکتور"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showRemained"
                    label="نمایش مانده"
                  />
                </div>

                <q-separator size="1px" spaced />
                <div class="text-subtitle2 text-weight-bold q-pb-md">
                  بخش پاورقی فاکتور
                </div>
                <div class="column q-gutter-sm">
                  <q-toggle
                    dense
                    v-model="designer.showSummary"
                    label="نمایش شرح"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showContract"
                    label="نمایش قرارداد"
                  />
                </div>

                <q-separator size="1px" spaced />
                <div class="text-subtitle2 text-weight-bold q-pb-md">
                  بخش فوتر
                </div>
                <div class="column q-gutter-sm q-pb-md">
                  <q-toggle
                    dense
                    v-model="designer.showFooter"
                    label="نمایش فوتر"
                  />
                  <q-toggle
                    dense
                    v-model="designer.showSignature"
                    label="نمایش امضا"
                  />
                </div>
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
          <div v-if="designer.showHeader" class="column q-gutter-xs">
            <table style="width: 100%">
              <tbody>
                <tr>
                  <td style="width: 25%">
                    <img
                      v-if="
                        designer.showLogo && shouldShowLogo && logoSrc
                      "
                      :src="logoSrc"
                      alt="logo"
                    />
                  </td>
                  <td>
                    <div class="text-center text-body2 text-bold">
                      {{ headerTitle }}
                    </div>
                  </td>
                  <td
                    style="width: 25%"
                    v-if="designer.showInvoiceInfo"
                  >
                    <div>
                      <span>{{ $t("shared.labels.no") }}:</span>
                      <span class="q-px-sm text-weight-600">
                        {{ previewInvoiceModel.no }}
                      </span>
                    </div>

                    <div>
                      <span>{{ $t("shared.labels.date") }}:</span>
                      <span class="q-px-sm text-weight-600">
                        {{ previewInvoiceModel.date }}
                      </span>
                    </div>

                    <div
                      v-if="
                        showDueDate && previewInvoiceModel.dueDate
                      "
                    >
                      <span>{{ $t("shared.labels.dueDate") }}:</span>
                      <span class="q-px-sm text-weight-600">
                        {{ previewInvoiceModel.dueDate }}
                      </span>
                    </div>

                    <div
                      v-if="previewTaxId"
                      class="row justify-start"
                    >
                      <span>{{ $t("shared.columns.taxId") }}:</span>
                      <span
                        class="q-px-sm text-roboto text-weight-500"
                        style="font-size: 12px"
                      >
                        {{ previewTaxId }}
                      </span>
                    </div>
                  </td>
                  <td v-else style="width: 25%"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="designer.showHeader"
            class="q-table__middle scroll q-pt-md q-pb-sm"
          >
            <table
              :style="
                $q.screen.gt.xs ? 'width: 100%;' : 'width: 900px'
              "
              style="
                border-width: 1px;
                border-style: solid;
                border-image: initial;
                border-collapse: collapse;
                font-size: 13px;
              "
              class="print-preview-table"
            >
              <tbody
                v-if="
                  designer.showSellerInfo &&
                  appConfigStore.model?.value?.companySetting
                "
              >
                <tr>
                  <td
                    style="
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      padding: 3px;
                    "
                  >
                    <div>
                      {{ $t("shared.labels.seller") }}:
                      <strong>
                        {{
                          appConfigStore.model.value.companySetting
                            .name
                        }}
                      </strong>
                      <span
                        v-if="
                          appConfigStore.model.value.companySetting
                            .nationalNo
                        "
                      >
                        / {{ $t("shared.labels.nationalNo") }}:
                        {{
                          appConfigStore.model.value.companySetting
                            .nationalNo
                        }}
                      </span>
                      <span
                        v-else-if="
                          appConfigStore.model.value.companySetting
                            .taxNo
                        "
                      >
                        / {{ $t("shared.labels.taxNo") }}:
                        {{
                          appConfigStore.model.value.companySetting
                            .taxNo
                        }}
                      </span>
                    </div>

                    <div>
                      {{ $t("shared.columns.address") }}:
                      <strong>
                        {{
                          appConfigStore.model.value.companySetting
                            .location
                        }}
                        -
                      </strong>
                      <span class="text-wrap">
                        {{
                          appConfigStore.model.value.companySetting
                            .address
                        }}
                      </span>
                      <span
                        v-if="
                          appConfigStore.model.value.companySetting
                            .postalCode
                        "
                        class="q-px-sm"
                      >
                        <strong>
                          {{ $t("shared.labels.postalCode") }}:
                        </strong>
                        {{
                          appConfigStore.model.value.companySetting
                            .postalCode
                        }}
                      </span>

                      <span
                        v-if="
                          appConfigStore.model.value.companySetting
                            .phone
                        "
                      >
                        {{ $t("shared.labels.phone") }}:
                        {{
                          appConfigStore.model.value.companySetting
                            .phone
                        }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>

              <tbody v-if="designer.showCustomerInfo">
                <tr>
                  <td
                    style="
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      padding: 3px;
                    "
                  >
                    <div>
                      {{ $t("shared.labels.customer") }}:
                      <strong>{{ previewCustomerName }}</strong>
                      <span v-if="previewCustomerNationalNo">
                        / {{ $t("shared.labels.nationalNo") }}:
                        {{ previewCustomerNationalNo }}
                      </span>
                      <span v-else-if="previewCustomerTaxNo">
                        / {{ $t("shared.labels.taxNo") }}:
                        {{ previewCustomerTaxNo }}
                      </span>
                    </div>

                    <div v-if="previewCustomerAddress">
                      {{ $t("shared.columns.address") }}:
                      <strong v-if="previewCustomerLocation">
                        {{ previewCustomerLocation }}
                        -
                      </strong>
                      <span class="text-wrap">
                        {{ previewCustomerAddress }}
                      </span>
                      <span v-if="previewCustomerPostalCode">
                        /
                        <strong>
                          {{ $t("shared.labels.postalCode") }}:
                        </strong>
                        {{ previewCustomerPostalCode }}
                      </span>
                    </div>
                    <div v-if="previewCustomerPhone">
                      {{ $t("shared.labels.phone") }}:
                      {{ previewCustomerPhone }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="designer.showInvoiceItems"
            class="q-table__middle scroll"
          >
            <table
              style="
                width: 100%;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
                border-collapse: collapse;
                font-size: 12.4px;
              "
              class="print-preview-table"
            >
              <thead>
                <tr>
                  <th
                    v-for="(col, index) in designer.columns"
                    :key="col.id"
                    :style="getCellStyle(col)"
                    :data-index="index"
                    draggable="true"
                    @dragstart="handleActiveDragStart($event, index)"
                    @dragover.prevent
                    @drop="handleActiveDrop($event, index)"
                  >
                    <div
                      class="row items-center justify-between no-wrap"
                    >
                      <span>{{ col.label }}</span>
                      <q-icon name="o_drag_indicator" size="16px" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(
                    item, index
                  ) in previewInvoiceModel.invoiceItems"
                  :key="item.rowNo || index"
                >
                  <td
                    v-for="col in designer.columns"
                    :key="`${col.id}_${index}`"
                    :style="getTbodyCellStyle(col)"
                    :class="getCellAlignClass(col)"
                  >
                    <div
                      v-if="
                        col.field === 'productTitle' ||
                        col.field === 'productDisplay'
                      "
                      class="text-wrap"
                    >
                      {{ getCellValue(item, col) }}
                      <small
                        v-if="
                          item.comment &&
                          col.field === 'productDisplay'
                        "
                      >
                        ({{ item.comment }})
                      </small>
                    </div>
                    <template v-else>
                      {{ getCellValue(item, col) }}
                    </template>
                  </td>
                </tr>

                <tr v-if="designer.columns.length">
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      text-align: end;
                    "
                    :colspan="designer.columns.length - 1"
                    class="text-right"
                  >
                    {{ $t("shared.labels.subTotal") }}:
                  </td>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                    "
                  >
                    <strong>
                      {{ formatPreviewNumber(previewSubTotal) }}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      text-align: end;
                    "
                    :colspan="designer.columns.length - 1"
                    class="text-right"
                  >
                    {{ $t("shared.labels.discount") }}:
                  </td>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                    "
                  >
                    <strong>
                      {{ formatPreviewNumber(previewDiscount) }}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      text-align: end;
                    "
                    :colspan="designer.columns.length - 1"
                    class="text-right"
                  >
                    {{ $t("shared.labels.vat") }}:
                  </td>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                    "
                  >
                    <strong>
                      {{ formatPreviewNumber(previewVat) }}
                    </strong>
                  </td>
                </tr>

                <tr
                  v-if="
                    hasQuantityColumn &&
                    previewInvoiceModel.invoiceItems?.length > 1
                  "
                >
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      text-align: end;
                    "
                    :colspan="designer.columns.length - 1"
                    class="text-right"
                  >
                    {{ $t("shared.labels.totalQuantity") }}:
                  </td>
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                    "
                  >
                    <strong>
                      {{ formatPreviewNumber(previewTotalQuantity) }}
                    </strong>
                  </td>
                </tr>

                <tr v-if="designer.columns.length">
                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                      text-align: end;
                    "
                    :colspan="designer.columns.length - 1"
                    class="text-right"
                  >
                    <strong>{{ $t("shared.labels.total") }}:</strong>
                  </td>

                  <td
                    style="
                      padding: 5px;
                      border-width: 1px;
                      border-style: solid;
                      border-image: initial;
                    "
                  >
                    <strong>
                      {{ formatPreviewNumber(previewTotal) }}
                    </strong>
                    {{ previewCurrency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="designer.showFooter">
            <div class="q-table__middle scroll q-pt-sm">
              <table
                :style="
                  $q.screen.gt.xs ? 'width:100%' : 'width:900px'
                "
                style="
                  width: 100%;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                  border-collapse: collapse;
                  font-size: 13px;
                "
                class="print-preview-table"
              >
                <tbody>
                  <tr
                    v-if="
                      designer.showRemained &&
                      previewInvoiceRemained &&
                      appConfigStore.model?.value?.companySetting
                        ?.showRemainedInInvoice
                    "
                  >
                    <td
                      style="
                        padding: 5px;
                        border-width: 1px;
                        border-style: solid;
                        border-image: initial;
                        text-align: left;
                      "
                      colspan="100%"
                    >
                      <span>
                        <strong style="padding: 0 5px">
                          {{ $t("shared.columns.totalReceipt") }}
                        </strong>
                        {{
                          formatPreviewNumber(
                            previewInvoiceRemained.payedAmount
                          )
                        }}
                      </span>

                      <span>
                        <strong style="padding: 0 5px">
                          {{ $t("shared.columns.remained") }}
                        </strong>
                        <span class="text-weight-600">
                          {{
                            formatPreviewNumber(
                              previewInvoiceRemained.remained
                            )
                          }}
                        </span>
                      </span>

                      <template
                        v-if="previewInvoiceRemained.otherRemained"
                      >
                        <span>
                          <strong style="padding: 0 5px">
                            {{
                              $t("shared.columns.remainedButThisYear")
                            }}
                          </strong>
                          <span class="text-weight-600">
                            {{
                              formatPreviewNumber(
                                previewInvoiceRemained.otherRemained
                              )
                            }}
                          </span>
                        </span>

                        <span>
                          <strong style="padding: 0 5px">
                            {{ $t("shared.columns.remainedTotal") }}
                          </strong>
                          {{
                            formatPreviewNumber(
                              previewInvoiceRemained.totalRemained
                            )
                          }}
                        </span>
                      </template>
                    </td>
                  </tr>

                  <tr
                    v-if="
                      (designer.showContract &&
                        previewInvoiceModel.contractTitle) ||
                      (designer.showSummary &&
                        previewInvoiceModel.summary) ||
                      designer.footerNote
                    "
                  >
                    <td
                      style="
                        padding: 5px;
                        border-width: 1px;
                        border-style: solid;
                        border-image: initial;
                      "
                      colspan="100%"
                    >
                      <strong>
                        {{ $t("shared.labels.comment") }}
                      </strong>
                      <div>
                        <strong
                          v-if="
                            designer.showContract &&
                            previewInvoiceModel.contractTitle
                          "
                        >
                          {{ previewInvoiceModel.contractTitle }}
                          <span
                            v-if="
                              designer.showSummary &&
                              previewInvoiceModel.summary
                            "
                            style="padding: 5px"
                          >
                            /
                          </span>
                        </strong>
                        <span
                          v-if="
                            designer.showSummary &&
                            previewInvoiceModel.summary
                          "
                          class="text-wrap"
                          v-html="previewInvoiceModel.summary"
                        ></span>
                      </div>
                      <div
                        v-if="designer.footerNote"
                        class="text-wrap"
                        v-html="designer.footerNote"
                      ></div>
                    </td>
                  </tr>

                  <tr>
                    <td
                      colspan="100%"
                      style="
                        padding: 5px;
                        border-width: 1px;
                        border-style: solid;
                        border-image: initial;
                        width: 50%;
                        height: 90px;
                        vertical-align: top;
                      "
                    >
                      {{ $t("shared.labels.sellerSignature") }}
                      <div
                        v-if="
                          designer.showSignature &&
                          shouldShowSignature &&
                          signatureSrc
                        "
                      >
                        <img
                          :src="signatureSrc"
                          alt="signature"
                          style="width: 120px"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
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
        showInvoiceInfo: config.showInvoiceInfo !== false,
        showSellerInfo: config.showSellerInfo !== false,
        showCustomerInfo: config.showCustomerInfo !== false,
        showInvoiceItems: config.showInvoiceItems !== false,
        showRemained: config.showRemained !== false,
        showSummary: config.showSummary !== false,
        showContract: config.showContract !== false,
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

    designer.value.headerTitle = "صورتحساب فروش کالا و خدمات";
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
        showInvoiceInfo: designer.value.showInvoiceInfo,
        showSellerInfo: designer.value.showSellerInfo,
        showCustomerInfo: designer.value.showCustomerInfo,
        showInvoiceItems: designer.value.showInvoiceItems,
        showRemained: designer.value.showRemained,
        showSummary: designer.value.showSummary,
        showContract: designer.value.showContract,
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

  onMounted(loadInitial);
</script>

<style lang="scss">
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }

  .settings-expansion-item .q-item {
    padding: 0 4px !important;
    border-radius: 4px !important;
  }
</style>
