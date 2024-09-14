<template>
  <sales-widget :customer-id="item.id" style="height: 80px" />
  <data-grid
    class="border-radius-lg q-mt-md"
    flat
    bordered
    toolbar
    multi-select
    :table-store="tableStore"
    :advanced-search="false"
  />
</template>

<script setup>
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
</script>
