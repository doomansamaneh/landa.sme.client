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
      {{ helper.formatNumber(item.salary) }}
    </template>
    <template #cell-baseYear="{ item }">
      {{ helper.formatNumber(item.baseYear) }}
    </template>
    <template #cell-housing="{ item }">
      {{ helper.formatNumber(item.housing) }}
    </template>
    <template #cell-food="{ item }">
      {{ helper.formatNumber(item.food) }}
    </template>
    <template #cell-child="{ item }">
      {{ helper.formatNumber(item.child) }}
    </template>
    <template #cell-mission="{ item }">
      {{ helper.formatNumber(item.mission) }}
    </template>
    <template #cell-overtime="{ item }">
      {{ helper.formatNumber(item.overtime) }}
    </template>
    <template #cell-reward="{ item }">
      {{ helper.formatNumber(item.reward) }}
    </template>
    <template #cell-bonus="{ item }">
      {{ helper.formatNumber(item.bonus) }}
    </template>
    <template #cell-serviceBenefit="{ item }">
      {{ helper.formatNumber(item.serviceBenefit) }}
    </template>
    <template #cell-leave="{ item }">
      {{ helper.formatNumber(item.leave) }}
    </template>
    <template #cell-addition="{ item }">
      {{ helper.formatNumber(item.addition) }}
    </template>
    <template #cell-deduction="{ item }">
      {{ helper.formatNumber(item.deduction) }}
    </template>
    <template #cell-insurranceEmp="{ item }">
      {{ helper.formatNumber(item.insurranceEmp) }}
    </template>
    <template #cell-taxAmount="{ item }">
      {{ helper.formatNumber(item.taxAmount) }}
    </template>
    <template #cell-amount="{ item }">
      {{ helper.formatNumber(item.amount) }}
    </template>
    <template #cell-payable="{ item }">
      <span class="text-weight-700">
        {{ helper.formatNumber(item.payable) }}
      </span>
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
