import { helper } from "src/helpers";

export function useDataTableExport(tableStore) {
  async function exportAll() {
    const data = await tableStore.getAll();
    helper.exportCsv(data.items, tableStore.columns.value);
  }

  function exportCurrentPage() {
    helper.exportCsv(tableStore.rows.value, tableStore.columns.value);
  }

  return {
    exportAll,
    exportCurrentPage,
  };
}
