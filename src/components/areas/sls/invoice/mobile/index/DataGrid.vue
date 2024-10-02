<template>
  <data-grid-summary :table-store="tableStore" />

  <!-- <div
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
  </div> -->

  <data-grid
    :data-table-store="tableStore"
    createUrl="/sls/invoice/create"
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
            <span v-if="item.taxId">
              <q-icon name="o_check" color="primary" size="xs">
                <q-tooltip
                  class="accent text-body1 no-letter-spacing"
                >
                  ارسال به سامانه مودیان
                </q-tooltip>
              </q-icon>
            </span>
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
        <span class="text-body3 text-bold">
          {{ $t("shared.labels.showDetail") }}
        </span>
      </q-btn>

      <q-btn
        round
        unelevated
        dense
        icon="o_more_vert"
        @click="showItemSheet(item)"
      />
    </template>
  </data-grid>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    :item="item"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";

  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import DataGridSummary from "./DataGridSummary.vue";
  import ItemSheet from "./DataGridItemSheet.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    title: String,
  });

  const item = ref(null);
  const itemSheetStatus = ref(false);

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
