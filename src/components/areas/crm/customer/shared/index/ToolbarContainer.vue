<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
      @edit-batch="editBatch"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @reorder="operationStore.reorder(tableStore.reloadData)"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
      @edit-batch="editBatch"
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useDialog } from "src/composables/useDialog";

  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";
  import EditBatch from "../forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();
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

  function downloadPdf() {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
      "landa-voucher"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${props.baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-voucher"
    );
  }
</script>
