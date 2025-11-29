<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="row items-center q-gutter-md">
          <div class="text-h6">
            {{ $t("shared.labels.invoice") }} - طراح جدول
          </div>
          <q-space />
          <q-btn
            color="primary"
            unelevated
            :loading="saving"
            icon="o_save"
            label="ذخیره"
            @click="save"
          />
        </div>
      </div>

      <div class="col-md-3">
        <div class="column q-gutter-md">
          <q-card bordered>
            <q-card-section>
              <q-expansion-item
                icon="o_view_stream"
                label="ستون‌ها"
                default-opened
              >
                <div class="row q-col-gutter-md q-py-sm">
                  <div
                    v-for="col in defaultPalette"
                    :key="col.field"
                    class="col-md-6 col-sm-6 col-xs-12"
                  >
                    <q-card
                      :class="[
                        'no-shadow q-hoverable cursor-pointer fit',
                      ]"
                      class="border-radius-xs"
                      bordered
                      clickable
                      @click="toggleColumn(col)"
                      @dragstart="onPaletteDragStart($event, col)"
                      draggable="true"
                      v-ripple
                    >
                      <span class="q-focus-helper" />
                      <q-card-section
                        class="row items-center q-gutter-xs no-wrap"
                      >
                        <q-icon size="20px" name="o_view_stream" />
                        <div class="column">
                          <div class="text-body2">
                            {{ col.label }}
                          </div>
                        </div>
                        <q-space />
                        <q-icon
                          size="20px"
                          :name="
                            isSelected(col)
                              ? 'o_check_circle'
                              : 'o_radio_button_unchecked'
                          "
                          :color="
                            isSelected(col) ? 'positive' : 'grey'
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

              <!-- unified list replaces separate selected section -->

              <!-- removed column settings as requested -->
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="col-md">
        <q-card bordered class="q-pa-md">
          <div class="q-mb-md">
            <div class="row items-center q-gutter-sm">
              <q-icon name="o_preview" />
              <div class="text-body1 text-weight-600">پیش‌نمایش</div>
            </div>
          </div>
          <div class="q-gutter-y-md">
            <div
              v-if="designer.showHeader"
              class="column q-gutter-xs"
            >
              <table style="width: 100%">
                <tbody>
                  <tr>
                    <td style="width: 25%">
                      <img
                        v-if="
                          designer.showLogo &&
                          appConfigStore.model?.value?.companySetting
                            ?.invoiceShowLogo &&
                          logoSrc
                        "
                        :src="logoSrc"
                        alt="logo"
                        style="max-height: 55px"
                      />
                    </td>
                    <td>
                      <div class="text-center text-body2 text-bold">
                        {{
                          designer.headerTitle ||
                          $t("shared.labels.invoice")
                        }}
                      </div>
                    </td>
                    <td style="width: 25%">
                      <div>
                        <span>{{ $t("shared.labels.no") }}:</span>
                        <span class="q-px-sm text-weight-600">
                          {{ "12345" }}
                        </span>
                      </div>
                      <div>
                        <span>{{ $t("shared.labels.date") }}:</span>
                        <span class="q-px-sm text-weight-600">
                          {{
                            new Date().toISOString().substring(0, 10)
                          }}
                        </span>
                      </div>
                      <div>
                        <span>
                          {{ $t("shared.labels.dueDate") }}:
                        </span>
                        <span class="q-px-sm text-weight-600">
                          {{
                            new Date(
                              Date.now() + 3 * 24 * 60 * 60 * 1000
                            )
                              .toISOString()
                              .substring(0, 10)
                          }}
                        </span>
                      </div>
                      <div class="row justify-start">
                        <span>{{ $t("shared.columns.taxId") }}:</span>
                        <span
                          class="q-px-sm text-roboto text-weight-500"
                          style="font-size: 12px"
                        >
                          {{ "0123456789" }}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="q-table__middle scroll">
              <table
                class="print-preview-table"
                style="
                  width: 100%;
                  border-width: 1px;
                  border-style: solid;
                  border-collapse: collapse;
                  font-size: 12.4px;
                "
              >
                <thead>
                  <tr class="bg-on-dark">
                    <td
                      v-if="designer.columns.length"
                      colspan="100%"
                      style="
                        border-width: 1px;
                        border-style: solid;
                        padding: 5px;
                      "
                      class="text-center"
                    >
                      <div class="text-body2 text-weight-500">
                        {{
                          $t("shared.labels.productOrServiceDetails")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      v-for="(col, i) in designer.columns"
                      :key="col.id"
                      :style="thStyle(col)"
                      :data-index="i"
                      draggable="true"
                      @dragstart="onActiveDragStart($event, i)"
                      @dragover.prevent
                      @drop="onActiveDrop($event, i)"
                      class="text-body2"
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
                  <tr v-for="r in 3" :key="r">
                    <td
                      v-for="col in designer.columns"
                      :key="col.id + '_r' + r"
                      :style="tdStyle(col)"
                      :class="cellAlignClass(col)"
                    >
                      {{ sampleCell(col) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="designer.showFooter" class="q-pt-sm">
              <q-separator />
              <div class="q-pt-sm q-table__middle scroll">
                <table
                  :style="
                    $q.screen.gt.xs ? 'width:100%' : 'width:900px'
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
                  <tbody>
                    <tr v-if="designer.footerNote">
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
                        <div></div>
                        <div
                          class="text-wrap"
                          v-html="designer.footerNote"
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 5px;
                          border-width: 1px;
                          border-style: solid;
                          border-image: initial;
                          width: 50%;
                          height: 90px;
                        "
                        class="text-body2 vertical-top"
                        colspan="100%"
                      >
                        {{ $t("shared.labels.sellerSignature") }}
                        <div
                          v-if="
                            appConfigStore.model?.value
                              ?.companySetting
                              ?.invoiceShowSignature && signatureSrc
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
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { mediaType } from "src/constants";

  const $q = useQuasar();
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

  const defaultPalette = [
    {
      field: "rowNo",
      label: "ردیف",
      sample: "1",
      width: 48,
      align: "center",
    },
    {
      field: "productCode",
      label: "کد",
      sample: "PRD-1001",
      width: 100,
      align: "center",
    },
    {
      field: "productTitle",
      label: "شرح کالا/خدمت",
      sample: "محصول نمونه",
      width: 220,
      align: "right",
    },
    {
      field: "quantity",
      label: "تعداد",
      sample: "2",
      width: 80,
      align: "center",
    },
    {
      field: "productUnitTitle",
      label: "واحد",
      sample: "عدد",
      width: 80,
      align: "center",
    },
    {
      field: "price",
      label: "فی",
      sample: "120,000",
      width: 100,
      align: "center",
    },
    {
      field: "lineTotal",
      label: "مبلغ",
      sample: "240,000",
      width: 120,
      align: "center",
    },
    {
      field: "discount",
      label: "تخفیف",
      sample: "0",
      width: 100,
      align: "center",
    },
    {
      field: "netAmount",
      label: "خالص",
      sample: "240,000",
      width: 120,
      align: "center",
    },
    {
      field: "vatAmount",
      label: "مالیات",
      sample: "24,000",
      width: 100,
      align: "center",
    },
    {
      field: "totalPrice",
      label: "جمع کل",
      sample: "264,000",
      width: 130,
      align: "center",
    },
  ];

  const designer = ref({
    showHeader: true,
    showFooter: true,
    showLogo: true,
    headerTitle: "",
    footerNote: "",
    columns: [],
  });

  const isSelected = (col) => {
    return designer.value.columns.some((c) => c.field === col.field);
  };

  const toggleColumn = (col) => {
    const idx = designer.value.columns.findIndex(
      (c) => c.field === col.field
    );
    if (idx > -1) {
      removeColumn(idx);
    } else {
      addColumn(col);
    }
  };

  const addColumn = (col) => {
    designer.value.columns.push({
      id: cryptoRandomId(),
      field: col.field,
      label: col.label,
      width: col.width,
      align: col.align,
      sample: col.sample,
    });
    if (selectedIndex.value === -1) selectedIndex.value = 0;
  };

  const removeColumn = (index) => {
    designer.value.columns.splice(index, 1);
    if (selectedIndex.value >= designer.value.columns.length) {
      selectedIndex.value = designer.value.columns.length - 1;
    }
  };

  const thStyle = (col) => {
    return {
      borderWidth: "1px",
      borderStyle: "solid",
      padding: "5px",
      minWidth: col.width ? `${col.width}px` : undefined,
      width: col.width ? `${col.width}px` : undefined,
    };
  };

  const tdStyle = (col) => {
    return {
      borderWidth: "1px",
      borderStyle: "solid",
      padding: "5px",
      minWidth: col.width ? `${col.width}px` : undefined,
      width: col.width ? `${col.width}px` : undefined,
    };
  };

  const cellAlignClass = (col) => {
    if (col.align === "center") return "text-center";
    if (col.align === "left") return "text-left";
    return "text-right";
  };

  const sampleCell = (col) => {
    return col.sample ?? "";
  };

  const onPaletteDragStart = (ev, col) => {
    dragData.value = { fromPalette: true, index: -1, payload: col };
    try {
      ev.dataTransfer.effectAllowed = "copy";
    } catch {}
  };

  const onActiveDragStart = (ev, index) => {
    dragData.value = { fromPalette: false, index, payload: null };
    try {
      ev.dataTransfer.effectAllowed = "move";
    } catch {}
  };

  const onActiveDrop = (ev, targetIndex) => {
    const d = dragData.value;
    if (d.fromPalette && d.payload) {
      // insert new column at target index or move if already selected
      const payload = d.payload;
      const existingIndex = designer.value.columns.findIndex(
        (c) => c.field === payload.field
      );
      if (existingIndex > -1) {
        const item = designer.value.columns.splice(
          existingIndex,
          1
        )[0];
        designer.value.columns.splice(targetIndex, 0, item);
        selectedIndex.value = targetIndex;
      } else {
        designer.value.columns.splice(targetIndex, 0, {
          id: cryptoRandomId(),
          field: payload.field,
          label: payload.label,
          width: payload.width,
          align: payload.align,
          sample: payload.sample,
        });
        if (selectedIndex.value === -1)
          selectedIndex.value = targetIndex;
      }
    } else if (!d.fromPalette && d.index > -1) {
      // reorder
      const from = d.index;
      if (from === targetIndex) return;
      const item = designer.value.columns.splice(from, 1)[0];
      designer.value.columns.splice(targetIndex, 0, item);
      selectedIndex.value = targetIndex;
    }
    dragData.value = { fromPalette: false, index: -1, payload: null };
  };

  const loadInitial = async () => {
    // Load logo preview (if any) for header
    try {
      appConfigStore.resetAvatars?.();
      const v = await appConfigStore.getAvatar?.(mediaType.avatar);
      logoSrc.value = v || "";
      const s = await appConfigStore.getAvatar?.(mediaType.signature);
      signatureSrc.value = s || "";
    } catch {}

    const cfg =
      appConfigStore.model.value?.companySetting
        ?.invoiceTableTemplate;
    if (cfg && typeof cfg === "object") {
      // basic validation
      designer.value.showHeader = cfg.showHeader !== false;
      designer.value.showFooter = cfg.showFooter !== false;
      designer.value.showLogo = cfg.showLogo !== false;
      designer.value.headerTitle = cfg.headerTitle || "";
      designer.value.footerNote = cfg.footerNote || "";
      designer.value.columns = Array.isArray(cfg.columns)
        ? cfg.columns.map((c) => ({
            ...c,
            id: c.id || cryptoRandomId(),
          }))
        : [];
      if (designer.value.columns.length) selectedIndex.value = 0;
    } else {
      // default columns
      [
        "rowNo",
        "productCode",
        "productTitle",
        "quantity",
        "productUnitTitle",
        "price",
        "lineTotal",
        "vatAmount",
        "totalPrice",
      ].forEach((f) => {
        const p = defaultPalette.find((x) => x.field === f);
        if (p) addColumn(p);
      });
      designer.value.headerTitle = "پیش‌نمایش فاکتور";
      designer.value.footerNote = "از خرید شما سپاسگزاریم.";
    }
  };

  const save = async () => {
    try {
      saving.value = true;
      const payload = {
        showHeader: designer.value.showHeader,
        showFooter: designer.value.showFooter,
        showLogo: designer.value.showLogo,
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
    } catch (e) {
      $q.notify({
        type: "negative",
        message: "خطا در ذخیره تنظیمات",
      });
    } finally {
      saving.value = false;
    }
  };

  const cryptoRandomId = () => {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return Math.random().toString(36).slice(2);
  };

  onMounted(loadInitial);
</script>

<style scoped>
  /* keep preview table styles consistent with print preview look */
  .print-preview-table th,
  .print-preview-table td {
    vertical-align: middle;
  }
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }
</style>
