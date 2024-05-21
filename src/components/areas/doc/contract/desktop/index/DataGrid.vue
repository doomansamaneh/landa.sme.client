<template>
  <span></span>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    multiSelect
    numbered
    bordered
    wrapCells
    dense
    expandable
  >
    <template #filter-isActive="{ col }">
      <custom-select
        v-model="col.value"
        :options="isActiveOptions"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template #cell-income="{ item }">
      {{ item.income.toLocaleString() }}
    </template>
    <template #cell-expense="{ item }">
      {{ item.expense.toLocaleString() }}
    </template>
    <template #cell-netIncome="{ item }">
      {{ item.netIncome.toLocaleString() }}
    </template>
    <template #cell-startDate="{ item }">
      {{ item.startDate?.substring(0, 10) }}
    </template>
    <template #cell-finishDate="{ item }">
      {{ item.finishDate?.substring(0, 10) }}
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" />
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        :base-route="baseRoute"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { isActiveOptions } from "src/constants";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
  });

  const dataGrid = ref(null);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
