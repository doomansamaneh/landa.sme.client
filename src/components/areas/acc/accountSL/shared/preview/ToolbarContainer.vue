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
  import { useAccountSLGrid } from "../../../_composables/useAccountSLGrid";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useAccountSLPreviewMenu } from "../../../_menus/useAccountSLPreviewMenu";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: { type: String, default: "acc/accountSL" },
  });

  const slStore = useAccountSLGrid();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => slStore.reset(),
    }
  );

  const menuItems = computed(() =>
    useAccountSLPreviewMenu(context.value)
  );
</script>
