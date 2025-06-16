import { computed } from "vue";
import { downloadManager } from "src/helpers";
import { useDataTableExport } from "src/composables/useDataTableExport";
import { useFormActions } from "src/composables/useFormActions";

export function useDataGridMenuContext(
  tableStore,
  baseRoute = "",
  customHandlers = {}
) {
  const selectedIds = computed(() =>
    tableStore.selectedRows?.value.map((item) => item.id)
  );

  const activeRow = computed(() => tableStore.activeRow?.value);
  const { exportAll, exportCurrentPage } =
    useDataTableExport(tableStore);
  const crudStore = useFormActions(baseRoute);

  const defaultHandlers = {
    reloadData: () => {
      tableStore.reloadData();
    },

    deleteBatch: () =>
      crudStore.deleteBatch(selectedIds.value, tableStore.reloadData),

    deleteById: () =>
      crudStore.deleteById(
        activeRow.value?.id,
        tableStore.reloadData
      ),

    print: () => {
      const id = activeRow.value?.id;
      if (id) {
        downloadManager.downloadGet(
          `${baseRoute}/GeneratePdf/${id}`,
          "landa-document"
        );
      }
    },

    printBatch: () => {
      downloadManager.downloadPost(
        `${baseRoute}/GenerateBatchPdf`,
        tableStore.pagination.value,
        "landa-document"
      );
    },

    exportAll,
    exportCurrentPage,
  };

  return computed(() => ({
    selectedIds: selectedIds.value,
    activeRow: activeRow.value,
    ...defaultHandlers,
    ...customHandlers,
  }));
}
