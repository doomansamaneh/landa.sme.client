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
    :base-route="baseRoute"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { usePurchaseState } from "../../../_composables/usePurchaseState";
  import { usePurchasePreviewMenu } from "../../../_menus/usePurchasePreviewMenu";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/DynamicToolBarMobile.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const purchaseStore = usePurchaseState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => purchaseStore.reset(),
    }
  );

  const menuItems = computed(() =>
    usePurchasePreviewMenu(context.value)
  );
</script>
