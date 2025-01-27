<template>
  <data-grid
    ref="dataGrid"
    flat
    bordered_
    :data-source="dataSource"
    :grid-store="gridStore"
    @row-dbl-click="rowDblClick"
    expandable
  >
    <template #expand="{ item }">
      <perview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { sqlOperator } from "src/constants";
  import { helper } from "src/helpers";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageItemColumns } from "../../../_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Perview from "../../../wageItem/shared/preview/IndexView.vue";

  const props = defineProps({
    wageId: String,
  });

  const gridStore = useBaseInfoGrid({
    columns: wageItemColumns,
    sortColumn: "rowNo",
    filterExpression: [
      {
        fieldName: "i.wageId",
        operator: sqlOperator.equal,
        value: props.wageId,
      },
    ],
  });
  const dataSource = "prl/wageItem/getGridData";
  const dataGrid = ref(null);
  const router = useRouter();

  function rowDblClick(row) {
    router.push(`/prl/wageItem/preview/${row.id}`);
  }
</script>
