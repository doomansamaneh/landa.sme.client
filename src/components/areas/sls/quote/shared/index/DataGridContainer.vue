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
  import { useQuoteState } from "../../../_composables/useQuoteState";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGridToolbar from "./DataGridToolbar.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: { type: String, default: "sls/quote/getGridData" },
  });

  const { t } = useI18n();

  const title = t("main-menu-items.Sls_Quote_View");

  const quoteStore = useQuoteState();
  const gridStore = useBaseInfoGrid(quoteStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
