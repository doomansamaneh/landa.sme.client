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
  import { usePurchaseState } from "../../../_composables/usePurchaseState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: {
      type: String,
      default: "sls/purchase/getGridData",
    },
  });

  const { t } = useI18n();

  const title = t("main-menu-items.Sls_Purchase_View");

  const purchseStore = usePurchaseState();
  const gridStore = useBaseInfoGrid(purchseStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
