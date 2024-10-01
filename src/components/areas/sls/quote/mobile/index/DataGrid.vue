<template>
  <data-grid
    :data-table-store="tableStore"
    createUrl="/sls/quote/create"
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
            <q-avatar size="50px" color="primary" text-color="white">
              <q-icon name="o_done" size="md" />
            </q-avatar>
          </q-btn>
        </div>

        <div class="row justify-between items-center">
          <div class="col row items-center">
            <span class="text-caption text-on-dark">شماره:</span>
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
                {{ helper.formatNumber(item.payedAmount) }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-pb-none q-px-sm">
        <div class="row items-center q-gutter-sm">
          <span
            class="border-radius-sm bg-orange-2 text-caption text-red label"
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
            class="border-radius-sm primary-gradient text-caption text-white label"
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
        :to="`/sls/quote/preview/${item.id}`"
      >
        <span class="text-body3 text-bold">مشاهده جزئیات</span>
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

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ItemSheet from "./DataGridItemSheet.vue";

  const props = defineProps({
    tableStore: Object,
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
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }

  .label {
    padding: 2px 12px;
  }
</style>
