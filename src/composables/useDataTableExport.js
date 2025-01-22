import { helper } from "src/helpers";

export function useDataTableExport(tableStore) {
  async function exportAll() {
    const rows = await tableStore.getAll();
    helper.exportCsv(rows, tableStore.columns.value);
  }

  function exportCurrentPage() {
    helper.exportCsv(tableStore.rows.value, tableStore.columns.value);
  }

  return {
    exportAll,
    exportCurrentPage,
  };
}
