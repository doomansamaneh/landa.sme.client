<template>
  <data-grid
    :title="$t('main-menu-items.Sls_Quote_View')"
    :table-store="tableStore"
    :advanced-search="false"
    :no-fullscreen="true"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useCustomerQuoteState } from "../../../_composables/useCustomerQuoteState";

  import DataGrid from "src/components/areas/sls/quote/shared/index/DataGridTable.vue";

  const props = defineProps({
    item: Object,
    title: String,
  });

  const tableStore = useDataTable({
    dataSource: `sls/quote/GetByCustomerData/${props.item.id}`,
    store: useCustomerQuoteState(),
  });
</script>
