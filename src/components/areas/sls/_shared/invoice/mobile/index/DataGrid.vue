<template>
  <data-grid-summary :table-store="tableStore" />

  <data-grid
    :data-table-store="tableStore"
    :createUrl="`/${baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    avatar-field="customerId"
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
        <div class="col text-body3 text-weight-600">
          {{ item.customerName }}
        </div>
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
        <div class="row q-gutter-x-xs text-caption">
          <div>{{ item.no }}#</div>
          <div class="row items-center q-gutter-xs">
            <q-icon size="10px" name="o_calendar_today" />
            <div>{{ helper.formatPersianDate(item.date) }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="item.subject"
        class="col text-caption caption-on-dark"
      >
        {{ item.subject }}
      </div>
    </template>

    <template #row-badge="{ item }">
      <tax-badge :tax-id="item.taxId" />
      <notification-badge :count="item.notificationCount" />
      <status-badge :title="item?.statusTitle" />
      <type-badge :title="item?.typeTitle" />
      <contract-badge :title="item?.contractTitle" :id="item?.id" />
    </template>

    <template #row-toolbar="{ item }">
      <slot name="row-toolbar" :item="item" />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
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
</script>
