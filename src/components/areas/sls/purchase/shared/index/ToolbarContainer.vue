<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @edit-batch="editBatch"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
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
      @edit-batch="editBatch"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { invoiceFormType } from "src/constants";
  import { useDialog } from "src/composables/useDialog";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";
  import EditBatch from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "sls/purchase";
  const dialogStore = useDialog();
  const crudStore = useFormActions(baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function downloadPdf() {
    downloadManager.downloadGet(
      `${baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
      "landa-purchase"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-purchase"
    );
  }

  function editBatch() {
    dialogStore.openDialog({
      title: `shared.labels.editBatch`,
      component: EditBatch,
      actions: true,
      props: {
        selectedIds: selectedIds?.value,
        formType: invoiceFormType.purchase,
      },
      okCallback: async (response) => {
        await props.tableStore.reloadData();
      },
    });
  }
</script>
