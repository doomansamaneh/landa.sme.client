<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :preview-page="true"
    show-avatar
    show-badge
    card-padding="q-pa-xs"
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{
        helper.getFirstChar(
          item.customerName ?? item.amount?.toString()
        )
      }}
    </template>

    <template #row-body="{ item }">
      <div class="row justify-between">
        <div class="col text-body3 text-weight-600">
          {{ item.customerName }}
        </div>
      </div>

      <div class="row q-gutter-x-sm text-body3 text-weight-500">
        <div v-if="item.amount">
          <span class="text-body2 text-weight-900">
            {{ helper.formatNumberReadable(item.amount) }}
          </span>
        </div>
      </div>

      <div>
        <div class="row q-gutter-x-xs text-caption">
          <div class="row items-center">
            <q-icon name="o_tag" />
            <div>{{ item.itemNo }}</div>
          </div>
          <div class="row items-center q-gutter-xs">
            <q-icon size="10px" name="o_calendar_today" />
            <div>{{ helper.formatDate(item.itemDate) }}</div>
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
     <div class="flex items-center">
      <q-icon
        v-if="item.notifyCheck"
        size="20px"
        name="o_warning"
        color="warning"
        class="q-mr-xs"
      />
      <status-badge
        :title="
          $t(
            `shared.paymentStatus.${helper.getEnumType(
              item.statusId,
              paymentStatus
            )}`
          )
        "
      />
     </div>
    </template>

  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { paymentStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import { checkItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
  import StatusBadge from "src/components/areas/_shared/badges/StatusBadge.vue";

  const props = defineProps({
    filterExpression: Array,
    title: String,
  });

  const baseRoute = "trs/paymentItemCheck";

  const tableStore = useDataTable({
    dataSource: "trs/report/getCheckItemData",
    store: useBaseInfoGrid({
      columns: checkItemColumns,
      sortColumn: "itemDate",
      filterExpression: props.filterExpression,
    }),
  });
</script>

