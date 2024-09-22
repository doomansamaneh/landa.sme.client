<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="acc/voucher"
    activation
  >
    <template #buttons-custom>
      <q-separator class="q-my-sm" />
      <q-item clickable v-close-popup tabindex="0" @click="editBatch">
        <div class="q-py-sm">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_edit" />
            </q-avatar>
          </q-item-section>
        </div>
        <q-item-section>
          <div class="text-caption">
            {{ $t("shared.labels.editBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </tool-bar>

  <div class="column q-gutter-sm" style="margin-top: 46px">
    <q-card class="bordered primary-gradient">
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="col-2">
            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              {{ tableStore?.pagination.value.totalItems }}
            </q-btn>
          </div>

          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption text-bold text-blue-3">
                جمع کل
              </div>
              <div class="text-bold text-white text-caption">
                {{
                  helper.formatNumber(
                    tableStore?.summaryData?.value?.amount
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bordered bg-blue-grey-2"
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
              <div class="text-caption text-bold text-grey-7">
                جمع کل
              </div>
              <div class="text-bold text-grey-10 text-caption">
                {{
                  helper.formatNumber(
                    helper.getSubtotal(
                      tableStore.selectedRows.value,
                      "amount"
                    )
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div>
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
      :data-table-store="tableStore"
      createUrl="/acc/voucher/create"
    >
      <template #header>
        <template></template>
      </template>

      <template #row-header="{ item }">
        <q-card-section>
          <div class="row items-center justify-center">
            <q-btn
              round
              unelevated
              class="no-pointer-events"
              v-if="item.selected"
            >
              <q-avatar
                size="50px"
                color="primary"
                text-color="white"
              >
                <q-icon name="o_done" size="md" />
              </q-avatar>
            </q-btn>
          </div>

          <div class="row justify-between items-center">
            <div class="col row items-center">
              <span class="text-caption text-on-dark q-mr-xs">
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

        <q-separator />
      </template>

      <template #row-body="{ item }">
        <q-card-section class="no-padding">
          <div class="column q-gutter-sm">
            <div class="row items-center q-px-sm">
              <div class="col row">
                <span
                  class="ellipsis-2-lines text-caption text-on-dark"
                >
                  {{ item.subject }}
                </span>
              </div>
            </div>

            <div class="row items-center q-px-sm">
              <div class="col">
                <span
                  class="ellipsis-2-lines text-body1 text-bold text-on-dark"
                >
                  {{ item.amount.toLocaleString() }}
                  <span class="text-caption">ریال</span>
                </span>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md q-pb-none q-px-sm">
          <div class="row items-center q-gutter-sm">
            <span
              class="text-caption label text-white border-radius-sm red-gradient"
            >
              {{ item.rowNo }}
            </span>

            <span
              class="border-radius-sm primary-gradient text-caption text-white label"
            >
              {{
                $t(
                  `shared.subSystem.${helper.getEnumType(
                    item.systemId,
                    subSystem
                  )}`
                )
              }}
            </span>

            <span
              class="border-radius-sm bluegrey-gradient text-caption text-white label"
            >
              {{
                $t(
                  `shared.voucherType.${helper.getEnumType(
                    item.typeId,
                    voucherType
                  )}`
                )
              }}
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
  </div>

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

          <q-item-section class="text-body1 no-letter-spacing">
            کپی
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" icon="o_edit" />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">
            ویرایش
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_email"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">
            ارسال ایمیل
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable v-ripple @click="showPrintDialog">
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_print"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">
            چاپ
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_delete"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">
            حذف
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="printDialog"
  >
    <q-card class="q-mt-xl">
      <q-card-section>
        <div class="row items-center justify-between">
          <span class="text-body1 no-letter-spacing">چاپ</span>
          <q-btn round unelevated icon="o_close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="no-padding">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_print"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              چاپ مستقیم
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_portrait"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
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

            <q-item-section class="text-body1 no-letter-spacing">
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

            <q-item-section class="text-body1 no-letter-spacing">
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

            <q-item-section class="text-body1 no-letter-spacing">
              پی دی اف - A5 - افقی
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_contact_mail"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              چاپ برچسب نشانی
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";
  import { subSystem, voucherType } from "src/constants";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import BottomSheet from "components/shared/BottomSheet.vue";
  import ToolBar from "src/components/shared/ToolBar.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
  });

  const crudStore = useFormActions("acc/voucher");
  const dialog = ref(false);

  const bottomSheetStatus = ref(false);
  const bottomSheetItem = ref(null);
  const printDialog = ref(false);

  const selectedDateRange = ref({ value: "", label: "" });

  const showSearchModal = () => {
    dialog.value = true;
  };

  async function reloadData(model) {
    await props.tableStore.reloadData();
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
    props.tableStore.selectRow(row, checked);
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

  const showPrintDialog = () => {
    printDialog.value = true;
  };
</script>

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }

  .label {
    padding: 2px 12px;
  }
</style>
