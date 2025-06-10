<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @reorder="operationStore.reorder(tableStore.reloadData)"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
    />
  </template>
  <template v-else>
    <toolbar-desktop :menu-items="menuItems" margin />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountingOperations } from "../../../_composables/useAccountingOperations";
  import { useVoucherDataGridMenu } from "../../../_menus/useVoucherDataGridMenu";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);
  const operationStore = useAccountingOperations();

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

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

  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );

  const context = computed(() => ({
    selectedIds: selectedIds.value,
    activeRow: props.tableStore?.activeRow?.value,
    reloadData: props.tableStore?.reloadData,
    deleteBatch: crudStore?.deleteBatch,
    deleteById: crudStore?.deleteById,
    exportAll,
    exportCurrentPage,
    reorderHandler: () =>
      operationStore.reorder(props.tableStore?.reloadData),
    printHandler: () => downloadPdf(),
    printBatchHandler: () => downloadBatchPdf,
  }));

  const menuItems = computed(() =>
    useVoucherDataGridMenu(context.value)
  );
</script>
