<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useSalesReturnPreviewMenu } from "../../../_menus/useSalesReturnPreviewMenu";
  import { useSalesReturnState } from "../../../_composables/useSalesReturnState";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const salesReturnStore = useSalesReturnState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    { onDeleteSuccess: () => salesReturnStore.reset() }
  );

  const menuItems = computed(() =>
    useSalesReturnPreviewMenu(context.value)
  );
</script>
