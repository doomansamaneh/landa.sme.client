<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    toolbar
    flat
    square_
    multiSelect
    numbered
    bordered_
    wrapCells
    dense_
    expandable
    :title="`${title} / ${subTitle}`"
  >
    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "amount")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "discountAmount")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "netAmount")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "vatAmount")
            )
          }}
        </b>
      </td>
      <td colspan="100%"></td>
      <td v-if="expandable"></td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.amount) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.discountAmount) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.vatAmount) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.netAmount) }}</b>
      </td>
      <td colspan="100%"></td>
      <td v-if="expandable"></td>
    </template>

    <template #expand="{ item }">
      <voucher-preview
        inside
        :voucher-id="item.voucherId"
        base-route="acc/voucher"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { taxReportColumns } from "../../_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "src/components/areas/acc/voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    dataSource: String,
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
    title: String,
    subTitle: String,
  });

  const searchStore = useInvoiceSearch();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: taxReportColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "voucherNo",
        columns: taxReportColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const colspan = computed(
    () =>
      helper.findIndex(tableStore.columns.value, "name", "amount") +
      1 + //numbered column
      1 //multi check column
  );
</script>
