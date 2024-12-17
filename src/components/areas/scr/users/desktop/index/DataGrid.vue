<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar
    multiSelect_
    numbered
    dense_
    expandable_
    @row-dbl-click_="gotoPreview"
  >
    <template #expand="{ item }">
      <preview inside :item="item" :base-route="baseRoute" />
    </template>
  </data-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  //import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: { type: String, default: "scr/users" },
  });

  const router = useRouter();

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
