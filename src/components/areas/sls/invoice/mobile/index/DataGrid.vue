<template>
  <tool-bar
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="sls/invoice"
    activation
    search-btn
  >
    <template #buttons-custom>
      <q-separator size="0.5px" class="q-my-sm" />
      <q-item clickable v-close-popup tabindex="0" @click="editBatch">
        <div class="q-py-sm">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_edit" />
            </q-avatar>
          </q-item-section>
        </div>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.editBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template #search-btn>
      <q-btn
        round
        unelevated
        dense
        v-if="!tableStore?.activeRow?.value"
        @click="showSearchModal"
      >
        <q-icon name="o_filter_alt" />
      </q-btn>
    </template>
  </tool-bar>

  <div class="column q-gutter-sm">
    <q-card class="bordered grid-total">
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="col-2">
            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              {{ gridStore?.pagination.value.totalItems }}
            </q-btn>
          </div>

          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption">جمع کل</div>
              <div class="text-bold text-white text-caption">
                {{
                  tableStore?.summaryData?.value?.amount.toLocaleString()
                }}
              </div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption">دریافت شده</div>
              <div class="text-bold text-white text-caption">
                {{
                  tableStore?.summaryData?.value?.payedAmount.toLocaleString()
                }}
              </div>
            </div>
            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption">مانده</div>
              <div class="text-bold text-white text-caption">
                {{
                  tableStore?.summaryData?.value?.remainedAmount.toLocaleString()
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bordered grid-subtotal"
      v-if="tableStore?.selectedRows?.value.length > 1"
    >
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="col-2">
            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              <q-icon size="28px" name="o_done" />
            </q-btn>
          </div>
          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption">جمع کل</div>
              <div class="text-bold text-caption">
                {{
                  helper
                    .getSubtotal(
                      tableStore.selectedRows.value,
                      "amount"
                    )
                    .toLocaleString()
                }}
              </div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption">مانده</div>
              <div class="text-bold text-caption">
                {{
                  helper
                    .getSubtotal(
                      tableStore.selectedRows.value,
                      "remainedAmount"
                    )
                    .toLocaleString()
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div
    class="row items-center justify-center text-body1 no-letter-spacing"
    v-if="selectedDateRange.label && shouldDisplaySelectedDateRange"
  >
    <q-btn
      @click="clearDateRangeFilter"
      size="xs"
      class="q-mr-sm"
      round
      unelevated
      dense
      icon="o_close"
      color="primary"
    />
    <span>نتایج جستجو برای: {{ selectedDateRange.label }}</span>
  </div>

  <data-grid
    data-source="sls/invoice/getGridData"
    :grid-store="gridStore"
    createUrl="/sls/invoice/create"
    ref="dataGrid"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-header="{ item }">
      <q-card-section>
        <div class="row items-center justify-center">
          <q-btn
            v-if="!item.selected"
            round
            unelevated
            class="no-pointer-events"
          >
            <q-avatar
              size="56px"
              text-color="white"
              :style="helper.generateAvatarStyle(item.id)"
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(item.customerName) }}
              </div>
            </q-avatar>
          </q-btn>
          <q-btn round unelevated class="no-pointer-events" v-else>
            <q-avatar size="56px" color="primary" text-color="white">
              <q-icon name="o_done" size="md" />
            </q-avatar>
          </q-btn>
        </div>

        <div class="row justify-between items-center">
          <div class="col row items-center">
            <span class="text-caption q-mr-xs text-on-dark">
              شماره:
            </span>
            <span class="text-caption text-on-dark">
              {{ item.no }}
            </span>
          </div>

          <div class="col row justify-end items-center q-gutter-xs">
            <span class="text-caption text-on-dark">
              {{ item.dateString }}
            </span>
          </div>
        </div>
      </q-card-section>

      <q-separator size="0.5px" />
    </template>

    <template #row-body="{ item }">
      <q-card-section class="no-padding">
        <div class="column q-gutter-sm">
          <div class="row items-center q-px-sm">
            <div class="col-3">
              <span class="text-caption text-on-dark">مشتری</span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-bold text-on-dark"
              >
                {{ item.customerName }}
              </span>
            </div>
          </div>

          <div class="row items-center q-px-sm">
            <div class="col-3">
              <span class="text-caption text-on-dark">شرح</span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-on-dark"
              >
                {{ item.subject }}
              </span>
              <div
                v-if="item.summary"
                class="ellipsis-2-lines text-caption-sm text-on-dark"
              >
                {{ item.summary }}
              </div>
            </div>
          </div>

          <div
            class="row items-center q-px-sm"
            v-if="item.discountAmount"
          >
            <div class="col-3">
              <span class="text-caption text-on-dark">تخفیف</span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-on-dark"
              >
                {{ item.discountAmount.toLocaleString() }}
              </span>
            </div>
          </div>

          <div class="row items-center q-px-sm">
            <div class="col-3">
              <span class="text-caption text-on-dark">جمع کل</span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-bold text-on-dark"
              >
                {{ item.amount.toLocaleString() }}
              </span>
            </div>
          </div>

          <div
            class="row items-center q-px-sm"
            v-if="item.payedAmount"
          >
            <div class="col-3">
              <span class="text-caption text-on-dark">
                دریافت شده
              </span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-caption text-on-dark"
              >
                {{ item.payedAmount.toLocaleString() }}
              </span>
            </div>
          </div>

          <div
            class="row items-center q-px-sm"
            v-if="item.remainedAmount"
          >
            <div class="col-3">
              <span class="text-caption text-on-dark">مانده</span>
            </div>
            <div class="col">
              <span
                class="ellipsis-2-lines text-caption text-bold text-on-dark"
              >
                {{ item.remainedAmount.toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-pb-none q-px-sm">
        <div class="row items-center q-gutter-sm">
          <span
            class="label text-white border-radius-sm text-caption orange-gradient"
          >
            {{ item.statusTitle }}
          </span>

          <span
            class="border-radius-sm primary-gradient text-caption text-white label"
          >
            {{ item.typeTitle }}
          </span>

          <span
            v-if="item.contractTitle"
            class="border-radius-sm bluegrey-gradient text-caption text-white label"
          >
            {{ item.contractTitle }}
          </span>
        </div>
      </q-card-section>
    </template>
    <template #row-actions="{ item }">
      <q-btn
        unelevated
        class="text-on-dark"
        :to="`/sls/invoice/preview/${item.id}`"
      >
        <span class="text-body3 text-bold">مشاهده جزئیات</span>
      </q-btn>

      <q-btn
        round
        unelevated
        dense
        icon="o_more_vert"
        @click="onBottomSheetShow(item)"
      />
    </template>
  </data-grid>

  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ bottomSheetItem.no }} / {{ bottomSheetItem.subject }}
    </template>

    <template #body>
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" icon="o_copy" />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            کپی
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" icon="o_edit" />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            ویرایش
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" class="q-my-sm" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_email"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            ارسال ایمیل
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" class="q-my-sm" />

        <q-item clickable v-ripple @click="onPrintSheetShow">
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_print"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            چاپ
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" class="q-my-sm" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_delete"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            حذف
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>

  <bottom-sheet
    v-if="printSheetStatus"
    header
    :status="printSheetStatus"
    @hide="onPrintSheetHide"
  >
    <template #header-title>چاپ</template>

    <template #body>
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_print"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            چاپ مستقیم
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_crop_portrait"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            پی دی اف - A4
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_crop_landscape"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            پی دی اف - A4 - افقی
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_crop_portrait"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            پی دی اف - A5
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_crop_landscape"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            پی دی اف - A5 - افقی
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_contact_mail"
            />
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            چاپ برچسب نشانی
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>

  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    maximized
    v-model="dialog"
  >
    <mobile-advanced-search @apply-search="hideSearchModal" />
  </q-dialog>
</template>

<script setup>
  import { computed, ref, onMounted } from "vue";

  import { helper } from "src/helpers";
  import { sqlOperator, voucherStatus } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import BottomSheet from "components/shared/BottomSheet.vue";
  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MobileAdvancedSearch from "src/components/areas/sls/invoice/mobile/_AdvancedSearch.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
  });

  const crudStore = useFormActions("sls/invoice");

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid.value?.tableStore);

  const dialog = ref(false);
  const showCreate = ref(true);
  const advancedSearch = ref(null);

  const bottomSheetStatus = ref(false);
  const printSheetStatus = ref(false);
  const bottomSheetItem = ref(null);

  const selectedDateRange = ref({ value: "", label: "" });

  const showSearchModal = () => {
    dialog.value = true;
  };

  const hideSearchModal = async () => {
    dialog.value = false;
  };

  async function reloadData(model) {
    await dataGrid.value.reloadData();
  }

  const shouldDisplaySelectedDateRange = computed(() => {
    return (
      selectedDateRange.value.value !== "all" &&
      selectedDateRange.value.value !== 0 &&
      selectedDateRange.value.label !== "shared.labels.0"
    );
  });

  const clearDateRangeFilter = () => {
    selectedDateRange.value = { value: "", label: "" };
    props.gridStore.setDefaultSearchModel();
    dialog.value = false;
    reloadData();
  };

  function selectRow(row, checked) {
    tableStore.value.selectRow(row, checked);
    emitselectedRows();
  }

  function emitselectedRows() {
    // emit("selected-rows-changed", tableStore.selectedRows.value)
  }

  const onBottomSheetShow = (row) => {
    bottomSheetItem.value = row;
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  const onPrintSheetShow = () => {
    printSheetStatus.value = true;
  };

  const onPrintSheetHide = () => {
    printSheetStatus.value = false;
  };
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
