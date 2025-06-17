<template>
  <data-grid :table-store="tableStore" base-route="sls/invoice">
    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.no} / ${item.customerName}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useInvoicePreviewMenu } from "../../../_menus/useInvoicePreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, "sls/invoice", {
      onDeleteSuccess: async () => props.tableStore?.reloadData(),
    });
    return useInvoicePreviewMenu(context.value);
  }
</script>
