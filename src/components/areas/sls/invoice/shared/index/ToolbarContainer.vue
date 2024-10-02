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
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import { useFormActions } from "src/composables/useFormActions";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";

  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";
  import ToolbarMobile from "../../mobile/index/ToolBar.vue";

  import EditBatch from "src/components/areas/sls/invoice/shared/forms/EditBatchDialog.vue";
  import ReorderInvoice from "src/components/areas/sls/invoice/shared/forms/ReorderDialog.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "sls/Invoice";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);
  const formStore = useInvoiceModel({ baseRoute: baseRoute });

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function cancelInvoice(id) {
    formStore.cancelInvoice(id, reloadData);
  }

  function downloadPdf(id) {
    formStore.downloadPdf(id);
  }

  function downloadBatchPdf() {
    formStore.downloadBatchPdf(props.tableStore.pagination.value);
  }

  function editBatch() {
    $q.dialog({
      component: EditBatch,
      componentProps: {
        selectedIds: selectedIds?.value,
      },
    }).onOk(async () => {
      await props.tableStore.reloadData();
    });
  }

  function reorder() {
    $q.dialog({
      component: ReorderInvoice,
    }).onOk(async () => {
      await props.tableStore.reloadData();
    });
  }

  function reloadData() {
    props.tableStore.reloadData();
  }
</script>
