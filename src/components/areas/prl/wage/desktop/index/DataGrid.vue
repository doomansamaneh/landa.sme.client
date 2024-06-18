<template>
  <data-grid
    ref="dataGrid"
    :base-route="baseRoute"
    :data-source="dataSource"
    :title="$t('main-menu-items.Prl_Wage_View')"
    :create-url="`/${baseRoute}/create`"
    :grid-store="gridStore"
    expandable
    toolbar
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>
    <template #cell-taxAmount="{ item }">
      {{ item.taxAmount?.toLocaleString() }}
    </template>
    <template #cell-insurranceAmount="{ item }">
      {{ item.insurranceAmount?.toLocaleString() }}
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    baseRoute: String,
    dataSource: String,
    gridStore: Object,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
