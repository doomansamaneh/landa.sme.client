<template>
  <toolbar-desktop :inside="inside" :menu-items="menuItems" />
  <preview :item="item" :title="title" ref="dataGrid" />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useProductStockPreviewMenu } from "src/components/areas/inv/_menus/useProductStockPreviewMenu.js";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import Preview from "./_ProductStockPreview.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
    title: String,
  });

  const context = usePreviewMenuContext(props.item, "cmn.product");

  const menuItems = computed(() =>
    useProductStockPreviewMenu(context.value)
  );
</script>
