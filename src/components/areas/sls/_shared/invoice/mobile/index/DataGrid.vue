<template>
  <data-grid-summary :table-store="tableStore" />

  <data-grid
    :data-table-store="tableStore"
    :createUrl="`/${baseRoute}/create`"
    ref="dataGrid"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-body="{ item }">
      <div class="col">
        <div class="row justify-between">
          <div
            class="col ellipsis text-body3 no-letter-spacing text-weight-500"
          >
            {{ item.customerName }} - {{ item.no }}
          </div>
          <div
            class="col-2 row justify-end text-caption text-weight-300"
          >
            <q-btn
              class="absolute-top-right q-ma-sm"
              round
              dense
              unelevated
              size="10px"
              @click.prevent="showItemSheet(item)"
            >
              <q-icon name="more_vert" size="20px" />
            </q-btn>
          </div>
        </div>

        <div
          v-if="item.amount"
          class="row q-gutter-sm text-body3 text-weight-500"
        >
          <div>
            <span class="text-body2 text-green text-weight-900">
              +
            </span>
            <span>
              {{ helper.formatNumberReadable(item.amount) }}
            </span>
          </div>
          <div v-if="item.remainedAmount">
            <span class="text-body2 text-negative text-weight-900">
              -
            </span>
            <span>
              {{ helper.formatNumberReadable(item.remainedAmount) }}
            </span>
          </div>
          <div v-if="item.payedAmount">
            <span class="text-body2 text-negative text-weight-900">
              <q-icon color="positive" name="arrow_downward" />
            </span>
            <span>
              {{ helper.formatNumberReadable(item.payedAmount) }}
            </span>
          </div>
        </div>
        <div
          v-if="item.subject"
          class="col ellipsis text-body3 caption-on-dark"
        >
          {{ item.subject }}
        </div>
        <div class="row no-wrap">
          <div class="col q-pt-sm no-wrap">
            <q-scroll-area style="height: 18px">
              <div class="row q-gutter-xs no-wrap q-pr-xs">
                <q-btn
                  v-if="item?.statusTitle"
                  padding="1px 9px"
                  unelevated
                  class="orange-gradient text-center text-caption-xs no-letter-spacing text-white border-radius-lg"
                  style="white-space: nowrap"
                >
                  {{ item?.statusTitle }}
                </q-btn>
                <q-btn
                  v-if="item?.typeTitle"
                  padding="1px 9px"
                  unelevated
                  class="primary-gradient text-center text-caption-xs no-letter-spacing text-white border-radius-lg"
                  style="white-space: nowrap"
                >
                  {{ item?.typeTitle }}
                </q-btn>
                <q-btn
                  v-if="item?.contractTitle"
                  padding="1px 9px"
                  unelevated
                  class="bluegrey-gradient text-center text-caption-xs no-letter-spacing text-white border-radius-lg"
                  style="white-space: nowrap"
                >
                  {{ item?.contractTitle }}
                </q-btn>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </template>
  </data-grid>
  <!-- <data-grid
    :data-table-store="tableStore"
    :createUrl="`/${baseRoute}/create`"
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
            <tax-badge :taxt-id="item.taxId" />
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
                {{ helper.formatNumber(item.discountAmount) }}
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
                {{ helper.formatNumber(item.amount) }}
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
                {{ helper.formatNumber(item.remainedAmount) }}
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-pb-none q-px-sm">
        <div class="row items-center q-gutter-sm">
          <notification-badge :count="item.notificationCount" />
          <status-badge :title="item.statusTitle" />
          <type-badge :title="item.typeTitle" />
          <contract-badge :title="item.contractTitle" />
        </div>
      </q-card-section>
    </template>
    <template #row-actions="{ item }">
      <q-btn
        unelevated
        class="text-on-dark"
        :to="`/${baseRoute}/preview/${item.id}`"
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
  </data-grid> -->

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :base-route="baseRoute"
    :status="itemSheetStatus"
    :item="item"
    @hide="hideItemSheet"
  >
    <template #items="{ item }">
      <slot name="item-sheet-items" :item="item"></slot>
    </template>
  </item-sheet>
</template>

<script setup>
  import { ref } from "vue";

  import { helper } from "src/helpers";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import DataGridSummary from "./DataGridSummary.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import NotificationBadge from "src/components/areas/_shared/badges/NotificationBadge.vue";
  import TaxBadge from "src/components/areas/_shared/badges/TaxBadge.vue";
  import StatusBadge from "src/components/areas/_shared/badges/StatusBadge.vue";

  const props = defineProps({
    tableStore: Object,
    baseRoute: String,
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

  defineExpose({
    hideItemSheet,
  });
</script>
