<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar
    multiSelect
    numbered
    dense
    expandable
    wrapCells
    wrap-cells
    :title="title"
    @row-dbl-click="gotoPreview"
  >
    <template #expand="{ item }">
      <preview
        inside
        :item="item"
        :title="title"
        :base-route="baseRoute"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
  });

  const router = useRouter();

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
