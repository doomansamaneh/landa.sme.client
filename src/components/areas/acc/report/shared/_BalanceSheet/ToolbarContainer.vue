<template>
  <toolbar-mobile v-if="$q.screen.xs" :menu-items="menuItems" />
  <toolbar-desktop
    v-else
    :menu-items="menuItems"
    margin
    :title="title"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useBalanceSheetMenu } from "src/components/areas/acc/report/_menus/useBalanceSheetMenu.js";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  const menuItems = computed(() => useBalanceSheetMenu());
</script>
