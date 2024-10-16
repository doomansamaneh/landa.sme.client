<template>
  <data-grid-summary :table-store="tableStore" />

  <data-grid
    :data-table-store="tableStore"
    :createUrl="`/${baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    show-badge
    ref="dataGrid"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.customerName) }}
    </template>

    <template #row-body="{ item }">
      <div class="row justify-between">
        <div
          class="col ellipsis text-body3 no-letter-spacing text-weight-600"
        >
          {{ item.customerName }}
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>

      <div class="row q-gutter-x-sm text-body3 text-weight-500">
        <div v-if="item.amount">
          <span class="text-body2 text-green text-weight-900">+</span>
          <span>
            {{ helper.formatNumberReadable(item.amount) }}
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
        <div v-if="item.remainedAmount">
          <span class="text-body2 text-negative text-weight-900">
            -
          </span>
          <span>
            {{ helper.formatNumberReadable(item.remainedAmount) }}
          </span>
        </div>
      </div>

      <div>
        <div class="text-caption-sm">
          {{ item.no }} -
          {{ helper.formatPersianDate(item.date) }}
        </div>
      </div>
      <div
        v-if="item.subject"
        class="col ellipsis text-caption-sm caption-on-dark"
      >
        {{ item.subject }}
      </div>
    </template>
    <template #row-badge="{ item }">
      <tax-badge :tax-id="item.taxId" />

      <notification-badge :count="item.notificationCount" />

      <q-btn
        v-if="item?.statusTitle"
        padding="1px 9px"
        unelevated
        class="orange-gradient text-white text-center text-caption-xs no-letter-spacing border-radius-lg"
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
    </template>
  </data-grid>

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
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";
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
