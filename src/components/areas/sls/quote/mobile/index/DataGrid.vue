<template>
  <data-grid :table-store="tableStore" base-route="sls/quote">
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
  import { useQuotePreviewMenu } from "../../../_menus/useQuotePreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, "sls/quote", {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useQuotePreviewMenu(context.value);
  }
</script>
