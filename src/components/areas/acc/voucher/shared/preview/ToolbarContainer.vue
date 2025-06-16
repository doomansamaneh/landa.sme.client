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
  import { useVoucherState } from "../../../_composables/useVoucherState";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useVoucherPreviewMenu } from "../../../_menus/useVoucherPreviewMenu";

  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "../../mobile/preview/PreviewToolbar.vue";

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

  const voucherStore = useVoucherState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => voucherStore.reset(),
    }
  );

  const menuItems = computed(() =>
    useVoucherPreviewMenu(context.value)
  );
</script>
