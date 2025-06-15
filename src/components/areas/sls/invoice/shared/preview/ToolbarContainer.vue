<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :crud-store="crudStore"
    :table-store="tableStore"
    :base-route="baseRoute"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { usePreviewToolbar } from "src/components/areas/_shared/menus/usePreviewToolbar";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { useInvoicePreviewMenu } from "../../../_menus/useInvoicePreviewMenu";

  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/DynamicToolBarMobile.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const tableStore = useDataTable({
    dataSource: "sls/invoice/getGridData",
  });

  const invoiceStore = useInvoiceState();

  const { menuItems } = usePreviewToolbar({
    model: props.model,
    baseRoute: props.baseRoute,
    crudStore: props.crudStore,
    onDeleteSuccess: () => invoiceStore.reset(),
    menuBuilder: useInvoicePreviewMenu,
  });
</script>
