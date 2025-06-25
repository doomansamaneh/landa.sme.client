<template>
  <toolbar-mobile v-if="$q.screen.xs" :menu-items="menuItems" />
  <toolbar-desktop v-else :menu-items="menuItems" margin />
</template>

<script setup>
  import { computed } from "vue";
  import { useIncomeStatementMenu } from "src/components/areas/acc/report/_menus/useIncomeStatementMenu.js";

  import ToolbarMobile from "src/components/shared/toolbars/DynamicToolbarMobile.vue";
  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";

  const menuItems = computed(() => useIncomeStatementMenu());
</script>
