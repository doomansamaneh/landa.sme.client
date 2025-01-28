<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @edit-batch="editBatch"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @edit-batch="editBatch"
      buttons
      margin
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDialog } from "src/composables/useDialog";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";
  import EditBatch from "../forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const dialogStore = useDialog();
  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
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
