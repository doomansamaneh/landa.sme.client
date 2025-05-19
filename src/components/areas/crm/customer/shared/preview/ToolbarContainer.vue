<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile :title="title" :item="item" buttons margin />
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      :inside="inside"
      :margin="!inside"
      :title="title"
      :item="item"
      buttons
      @edit-batch="editBatch"
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarDesktop from "../../desktop/preview/PreviewToolbar.vue";
  import ToolbarMobile from "../../mobile/preview/PreviewToolbar.vue";
  import EditBatch from "../forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    inside: Boolean,
    title: String,
    item: Object,
    tableStore: useDataTable,
  });

  const baseRoute = "crm/customer";
  const dialogStore = useDialog();
  const crudStore = useFormActions(baseRoute);

  const selectedIds = computed(
    () =>
      props.tableStore?.selectedRows?.value?.map((item) => item.id) ||
      []
  );

  function editBatch() {
    dialogStore.openDialog({
      title: `shared.labels.editBatch`,
      component: EditBatch,
      actionBar: true,
      props: {
        selectedIds: selectedIds?.value,
      },
      okCallback: async (response) => {
        await props.tableStore.reloadData();
      },
    });
  }
</script>
