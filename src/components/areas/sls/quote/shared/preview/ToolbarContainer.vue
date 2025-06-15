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
  import { useQuotePreviewMenu } from "../../../_menus/useQuotePreviewMenu";
  import { useQuoteState } from "../../../_composables/useQuoteState";

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
    dataSource: "sls/quote/getGridData",
  });

  const quoteStore = useQuoteState();

  const { menuItems } = usePreviewToolbar({
    model: props.model,
    baseRoute: props.baseRoute,
    crudStore: props.crudStore,
    onDeleteSuccess: () => quoteStore.reset(),
    menuBuilder: useQuotePreviewMenu,
  });
</script>
