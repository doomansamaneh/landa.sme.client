<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :title="title"
    :inside="inside"
    :menu-items="menuItems"
    margin
    back-button
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { usePurchaseReturnPreviewMenu } from "../../../_menus/usePurchaseReturnPreviewMenu";
  import { usePurchaseReturnState } from "../../../_composables/usePurchaseReturnState";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const purchaseReturnStore = usePurchaseReturnState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    { onDeleteSuccess: () => purchaseReturnStore.reset() }
  );

  const menuItems = computed(() =>
    usePurchaseReturnPreviewMenu(context.value)
  );
</script>
