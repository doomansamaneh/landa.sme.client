<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :menu-items="menuItems"
    buttons
    margin
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { useUsersDataGridMenu } from "src/components/areas/scr/_menus/useUsersDataGridMenu.js";
  import { useDataGridMenuContext } from "src/components/areas/_shared/menus/useDataGridMenuContext";

  import ToolbarDesktop from "components/shared/toolbars/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "scr/users" },
  });

  const context = useDataGridMenuContext(
    props.tableStore,
    props.baseRoute
  );

  const menuItems = computed(() =>
    useUsersDataGridMenu(context.value)
  );
</script>
