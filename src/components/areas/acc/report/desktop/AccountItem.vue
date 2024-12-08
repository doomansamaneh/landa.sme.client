<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    multiSelect
    flat
    numbered
    wrapCells_
    expandable
    toolbar
    :no-fullscreen="true"
  >
    <template #cell-debit="{ item }">
      {{ helper.formatNumber(item.credit) }}
    </template>
    <template #cell-credit="{ item }">
      {{ helper.formatNumber(item.credit) }}
    </template>
    <template #cell-inlineDebit="{ item }">
      <strong>{{ helper.formatNumber(item.inlineDebit) }}</strong>
    </template>
    <template #cell-debitRemained="{ item }">
      {{ helper.formatNumber(item.debitRemained) }}
    </template>
    <template #cell-creditRemained="{ item }">
      {{ helper.formatNumber(item.creditRemained) }}
    </template>
    <template #cell-voucherSubject="{ item }">
      {{ item.voucherSubject }}
      <div
        class="text-caption-sm"
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        v-if="item.comment"
      >
        {{ item.comment }}
      </div>
    </template>
    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "debitRemained")
              .toLocaleString()
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "creditRemained")
              .toLocaleString()
          }}
        </b>
      </td>
      <td colspan="100%">
        <b v-if="showInlineDebit">
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "debitRemained") -
                helper.getSubtotal(selectedRows, "creditRemained")
            )
          }}
        </b>
      </td>
    </template>
    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.debitRemained) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.creditRemained) }}</b>
      </td>
      <td colspan="100%">
        <b v-if="showInlineDebit">
          {{
            helper.formatNumber(
              summary?.debitRemained - summary?.creditRemained
            )
          }}
        </b>
      </td>
    </template>
    <template #expand="{ item }">
      <voucher-preview
        :voucher-id="item.voucherId"
        :voucher-item-id="item.id"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { accountItemColumns } from "../../_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "../../voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getItemData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
    noFullscreen: Boolean,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || accountItemColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "voucherNo",
        columns: props.columns || accountItemColumns,
      }),
  });

  const colspan = computed(
    () =>
      tableStore.columns.value.findIndex(
        (column) => column.name === "debitRemained"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const showInlineDebit = computed(
    () =>
      tableStore?.value?.columns.value.findIndex(
        (column) => column.name === "inlineDebit"
      ) >= 0
  );

  defineExpose({
    tableStore,
  });
</script>
