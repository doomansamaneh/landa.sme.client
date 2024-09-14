<template>
  <data-grid-toolbar
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
  />

  <data-grid-table :title="title" :table-store="tableStore" />
</template>

<script setup>
  import { useI18n } from "vue-i18n";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useSalesReturnState } from "../../../_composables/useSalesReturnState";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGridToolbar from "./DataGridToolbar.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: {
      type: String,
      default: "sls/salesReturn/getGridData",
    },
  });

  const { t } = useI18n();

  const title = t("main-menu-items.Sls_SalesReturn_View");

  const salesReturnStore = useSalesReturnState();
  const gridStore = useBaseInfoGrid(salesReturnStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
