<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #bootons-edit="{ row }">
      <menu-button-edit :to="`/${baseRoute}/edit/${row.id}`" />
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "scr/users" },
  });
</script>
