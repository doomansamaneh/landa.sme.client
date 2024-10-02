<template>
  <toolbar-container
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
  //import { useQuoteState } from "../../../_composables/useQuoteState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
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
