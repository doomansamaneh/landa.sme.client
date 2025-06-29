<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :menu-items="menuItems"
    :margin="!inside"
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
  import { useQuasar } from "quasar";
  import { useBillState } from "../../../_composables/useBillState";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useBillPreviewMenu } from "src/components/areas/trs/_menus/useBillPreviewMenu.js";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const $q = useQuasar();
  const billStore = useBillState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => billStore.reset(),
    }
  );

  const menuItems = computed(() => useBillPreviewMenu(context.value));
</script>
