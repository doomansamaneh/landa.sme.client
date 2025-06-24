<template>
  <toolbar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
  />
  <toolbar-mobile
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
  import { useContractPreviewMenu } from "../../../_menus/useContractPreviewMenu";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: { type: String, default: "doc/contract" },
  });

  const context = usePreviewMenuContext(props.model, props.baseRoute);

  const menuItems = computed(() =>
    useContractPreviewMenu(context.value)
  );
</script>
