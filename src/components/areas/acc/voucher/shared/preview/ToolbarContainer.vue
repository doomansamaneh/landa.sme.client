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
  />
</template>

<script setup>
  import { useVoucherState } from "../../../_composables/useVoucherState";
  import { usePreviewToolbar } from "src/components/areas/_shared/menus/usePreviewToolbar";
  import { useVoucherPreviewMenu } from "../../../_menus/useVoucherPreviewMenu";

  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "../../mobile/preview/PreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const voucherStore = useVoucherState();
  const { menuItems } = usePreviewToolbar({
    model: props.model,
    baseRoute: props.baseRoute,
    crudStore: props.crudStore,
    onDeleteSuccess: () => voucherStore.reset(),
    menuBuilder: useVoucherPreviewMenu,
  });
</script>
