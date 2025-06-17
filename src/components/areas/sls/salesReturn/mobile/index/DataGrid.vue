<template>
  <data-grid :table-store="tableStore" base-route="sls/salesReturn">
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
  import { useSalesReturnPreviewMenu } from "../../../_menus/useSalesReturnPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, "sls/salesReturn", {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useSalesReturnPreviewMenu(context.value);
  }
</script>
