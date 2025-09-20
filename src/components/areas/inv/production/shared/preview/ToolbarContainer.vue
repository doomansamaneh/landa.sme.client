<template>
  <toolbar-desktop
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useProductionPreviewMenu } from "src/components/areas/inv/_menus/useProductionPreviewMenu.js";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "inv/production";
  const router = useRouter();

  function deleteCallBack() {
    router.back();
  }

  const context = usePreviewMenuContext(props.model, baseRoute, {
    onDeleteSuccess: deleteCallBack,
  });

  const menuItems = computed(() =>
    useProductionPreviewMenu(context.value)
  );
</script>
