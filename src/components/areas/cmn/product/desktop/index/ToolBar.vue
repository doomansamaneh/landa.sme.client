<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    activation
    buttons
    margin
  >
    <template #bootons-edit="{ row }">
      <menu-button-edit :to="`/${baseRoute}/edit/${row.id}`" />
      <menu-button-copy :to="`/${baseRoute}/copy/${row.id}`" />
    </template>
    <template #buttons-batch-action>
      <menu-button
        @click="editBatch"
        :title="$t('shared.labels.editBatch')"
        icon="o_edit"
        :badge-count="selectedIds?.length"
      />
      <menu-button
        @click="editBatchPrice"
        title="اصلاح دسته‌ای قیمت"
        icon="o_edit"
        :badge-count="selectedIds?.length"
      />
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: String,
  });

  const emits = defineEmits(["edit-batch", "edit-batch-price"]);

  function editBatch() {
    emits("edit-batch");
  }

  function editBatchPrice() {
    emits("edit-batch-price");
  }
</script>
