<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="localGridStore"
    separator="horizontal"
    multiSelect
    flat
    numbered
    wrapCells_
    expandable
    toolbar
    :no-fullscreen="true"

  >
    <template #cell-credit="{ item }">
      {{ helper.formatNumber(item.credit) }}
    </template>
    <template #cell-debit="{ item }">
      debit: {{ helper.formatNumber(item.credit) }}
    </template>
    <template #cell-inlineDebit="{ item }">
      {{ helper.formatNumber(item.inlineDebit) }}
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
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountItemColumns } from "../../_composables/constants";
  
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "../../voucher/shared/preview/IndexView.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";
  
  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getItemData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
    noFullscreen: Boolean
  });

  const localGridStore = computed(
    () =>
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "voucherNo",
        columns: props.columns || accountItemColumns,
      })
  );
  
  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);
  const colspan = computed(
    () =>
      tableStore?.value?.columns.value.findIndex(
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
