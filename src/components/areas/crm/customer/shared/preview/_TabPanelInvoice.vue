<template>
  <sales-widget
    class="q-mb-md"
    v-if="hasRevenueExpense"
    :customer-id="item.id"
  />
  <data-grid
    flat
    bordered
    toolbar
    multi-select
    :table-store="tableStore"
    :advanced-search="false"
  />
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";
  import { useCustomerInvoiceState } from "../../../_composables/useCustomerInvoiceState";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/areas/sls/invoice/shared/index/DataGridTable.vue";
  import SalesWidget from "components/areas/dashboard/widgets/SalesWidget.vue";

  const props = defineProps({
    item: Object,
  });

  const gridStore = useCustomerInvoiceState();
  const tableStore = useDataTable({
    dataSource: `sls/invoice/GetByCustomerData/${props.item.id}`,
    store: gridStore,
  });

  const revenueExpenseStore = useRevenueExpense({
    dataSource: `acc/report/revenueByCustomerMonth/${props.item.id}`,
  });

  const hasRevenueExpense = computed(() => {
    return (
      revenueExpenseStore.chartSeries?.value?.some((series) =>
        series.data.some((amount) => amount > 0)
      ) ?? false
    );
  });
</script>
