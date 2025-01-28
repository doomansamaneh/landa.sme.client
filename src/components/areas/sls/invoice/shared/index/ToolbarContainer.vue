<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @cancel-invoice="cancelInvoice"
      @reorder="reorder"
      @edit-batch="editBatch"
      @download-pdf="downloadPdf"
      @download-batch-pdf="downloadBatchPdf"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @cancel-invoice="cancelInvoice"
      @reorder="reorder"
      @edit-batch="editBatch"
      @download-pdf="downloadPdf"
      @download-batch-pdf="downloadBatchPdf"
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { downloadManager } from "src/helpers";
  import { invoiceFormType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";

  import ToolbarDesktop from "../../desktop/index/ToolbarView.vue";
  import ToolbarMobile from "../../mobile/index/_ToolBar.vue";

  import EditBatch from "../../../_shared/invoice/shared/forms/EditBatchForm.vue";
  import ReorderInvoice from "src/components/areas/sls/invoice/shared/forms/ReorderForm.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const dialogStore = useDialog();
  const baseRoute = "sls/Invoice";

  const crudStore = useFormActions(baseRoute);
  const formStore = useInvoiceModel({ baseRoute: baseRoute });

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function cancelInvoice(id) {
    formStore.cancelInvoice(id, reloadData);
  }

  function downloadPdf(id) {
    downloadManager.downloadGet(
      `${baseRoute}/generatePdf/${id}`,
      "landa-invoice"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-invoice"
    );
  }

  function editBatch() {
    dialogStore.openDialog({
      title: `shared.labels.editBatch`,
      component: EditBatch,
      actionBar: true,
      props: {
        selectedIds: selectedIds?.value,
        formType: invoiceFormType.sales,
      },
      okCallback: async (response) => {
        await props.tableStore.reloadData();
      },
    });
  }

  function reorder() {
    dialogStore.openDialog({
      title: `shared.labels.reorder`,
      component: ReorderInvoice,
      actionBar: true,
      okCallback: async (response) => {
        await props.tableStore.reloadData();
      },
    });
  }

  function reloadData() {
    props.tableStore.reloadData();
  }
</script>
