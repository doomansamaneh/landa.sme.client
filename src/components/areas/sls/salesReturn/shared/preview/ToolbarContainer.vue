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
    :base-route="baseRoute"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { usePreviewToolbar } from "src/components/areas/_shared/menus/usePreviewToolbar";
  import { useSalesReturnPreviewMenu } from "../../../_menus/useSalesReturnPreviewMenu";
  import { useSalesReturnState } from "../../../_composables/useSalesReturnState";

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

  const salesReturnStore = useSalesReturnState();

  const { menuItems } = usePreviewToolbar({
    model: props.model,
    baseRoute: props.baseRoute,
    crudStore: props.crudStore,
    onDeleteSuccess: () => salesReturnStore.reset(),
    menuBuilder: useSalesReturnPreviewMenu,
  });
</script>
