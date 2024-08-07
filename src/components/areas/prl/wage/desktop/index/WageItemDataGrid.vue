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
    <template #cell-salary="{ item }">
      {{ item.salary?.toLocaleString() }}
    </template>
    <template #cell-baseYear="{ item }">
      {{ item.baseYear?.toLocaleString() }}
    </template>
    <template #cell-housing="{ item }">
      {{ item.housing?.toLocaleString() }}
    </template>
    <template #cell-food="{ item }">
      {{ item.food?.toLocaleString() }}
    </template>
    <template #cell-child="{ item }">
      {{ item.child?.toLocaleString() }}
    </template>
    <template #cell-mission="{ item }">
      {{ item.mission?.toLocaleString() }}
    </template>
    <template #cell-overtime="{ item }">
      {{ item.overtime?.toLocaleString() }}
    </template>
    <template #cell-reward="{ item }">
      {{ item.reward?.toLocaleString() }}
    </template>
    <template #cell-bonus="{ item }">
      {{ item.bonus?.toLocaleString() }}
    </template>
    <template #cell-serviceBenefit="{ item }">
      {{ item.serviceBenefit?.toLocaleString() }}
    </template>
    <template #cell-leave="{ item }">
      {{ item.leave?.toLocaleString() }}
    </template>
    <template #cell-addition="{ item }">
      {{ item.addition?.toLocaleString() }}
    </template>
    <template #cell-deduction="{ item }">
      {{ item.deduction?.toLocaleString() }}
    </template>
    <template #cell-insurranceEmp="{ item }">
      {{ item.insurranceEmp?.toLocaleString() }}
    </template>
    <template #cell-taxAmount="{ item }">
      {{ item.taxAmount?.toLocaleString() }}
    </template>
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>
    <template #cell-payable="{ item }">
      {{ item.payable?.toLocaleString() }}
    </template>

    <template #expand="{ item }">
      <perview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { sqlOperator } from "src/constants";

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
