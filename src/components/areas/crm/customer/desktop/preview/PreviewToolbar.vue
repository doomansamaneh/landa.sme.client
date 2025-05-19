<template>
  <tool-bar
    :title="title"
    :inside="inside"
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :selected-ids="selectedIds"
    buttons
    margin
  >
    <template #buttons>
      <menu-button-edit
        :to="`/crm/customer/edit/${item?.id}`"
        class="primary-gradient primary-shadow text-white text-body2"
        rounded
        unelevated
        no-caps
      />
    </template>
    <template #buttons-batch-action>
      <menu-button
        @click="editBatch"
        :title="$t('shared.labels.editBatch')"
        icon="o_edit"
        :badge-count="selectedIds?.length"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    tableStore: Object,
    crudStore: Object,
    baseRoute: String,
    selectedIds: Array,
  });

  const emits = defineEmits(["edit-batch"]);

  function editBatch() {
    emits("edit-batch");
  }
</script>
