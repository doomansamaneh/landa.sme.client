<template>
  <data-grid :table-store="tableStore" base-route="sls/purchase">
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
  import { usePurchasePreviewMenu } from "../../../_menus/usePurchasePreviewMenu";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  function getItemMenu(item) {
    const formStore = useInvoiceModel({ baseRoute: "sls/purchase" });
    const context = usePreviewMenuContext(item, "sls/purchase", {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
      cancelInvoice: () => {
        formStore.cancelInvoice(item.id, () =>
          props.tableStore?.reloadData()
        );
      },
    });
    return usePurchasePreviewMenu(context.value);
  }
</script>
