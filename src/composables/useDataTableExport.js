import { helper } from "src/helpers";
import { useI18n } from "vue-i18n";

export function useDataTableExport(tableStore) {
  const { t } = useI18n();

  function getTranslatedColumns() {
    return tableStore.columns.value.map((col) => ({
      ...col,
      label: t(`shared.columns.${col.name}`) || col.label,
    }));
  }

  async function exportAll() {
    const data = await tableStore.getAll();
    helper.exportCsv(data.items, getTranslatedColumns());
  }

  function exportCurrentPage() {
    helper.exportCsv(tableStore.rows.value, getTranslatedColumns());
  }

  async function exportAllExcel() {
    const data = await tableStore.getAll();
    helper.exportExcel(data.items, getTranslatedColumns());
  }

  function exportCurrentPageExcel() {
    helper.exportExcel(tableStore.rows.value, getTranslatedColumns());
  }

  return {
    exportAll,
    exportCurrentPage,
    exportAllExcel,
    exportCurrentPageExcel,
  };
}
