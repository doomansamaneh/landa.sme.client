<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar_
    multiSelect
    numbered
    dense
    expandable
    wrap-cells
    @row-dbl-click="gotoPreview"
  >
    <template #cell-amount="{ item }">
      <strong>{{ helper.formatNumber(item.amount) }}</strong>
    </template>
    <template #cell-taxAmount="{ item }">
      {{ helper.formatNumber(item.taxAmount) }}
    </template>
    <template #cell-insurranceAmount="{ item }">
      {{ helper.formatNumber(item.insurranceAmount) }}
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" :base-route="baseRoute" />
    </template>
  </data-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
  });

  const router = useRouter();

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
