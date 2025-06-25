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
    :base-route="baseRoute"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useBaseInfoPreviewMenu } from "src/components/areas/_shared/_menus/useBaseInfoPreviewMenu";

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
    baseRoute: { type: String, default: "trs/bankAccount" },
  });

  const context = usePreviewMenuContext(props.model, props.baseRoute);

  const menuItems = computed(() =>
    useBaseInfoPreviewMenu(context.value)
  );
</script>
