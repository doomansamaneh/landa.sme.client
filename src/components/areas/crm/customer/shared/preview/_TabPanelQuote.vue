<template>
  <data-grid :table-store="tableStore" :advanced-search="false" />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useCustomerQuoteState } from "../../../_composables/useCustomerQuoteState";

  import DataGrid from "src/components/areas/sls/quote/shared/index/DataGridTable.vue";

  const props = defineProps({
    item: Object,
  });

  const tableStore = useDataTable({
    dataSource: `sls/quote/GetByCustomerData/${props.item.id}`,
    store: useCustomerQuoteState(),
  });
</script>
