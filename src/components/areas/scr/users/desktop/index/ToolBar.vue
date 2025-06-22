<template>
  .
  <!-- <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #buttons-create>
      <menu-button
        class="primary-gradient primary-shadow text-white"
        :to="`/${baseRoute}/create`"
        title="دعوت از کاربر"
        icon="person_add"
      />
    </template>

    <template #bootons-edit>
      <span></span>
    </template>
  </toolbar-desktop> -->
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  // import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  // import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  // import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "scr/users" },
  });
</script>
