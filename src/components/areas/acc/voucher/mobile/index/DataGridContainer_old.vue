<template>
  <data-grid-summary :table-store="tableStore" />

  <div
    class="row items-center justify-center text-body1 no-letter-spacing"
    v-if="selectedDateRange.label && shouldDisplaySelectedDateRange"
  >
    <q-btn
      @click="clearDateRangeFilter"
      size="xs"
      class="q-mr-sm"
      round
      unelevated
      dense
      icon="o_close"
      color="primary"
    />
    <span>نتایج جستجو برای: {{ selectedDateRange.label }}</span>
  </div>

  <data-grid :table-store="tableStore" :title="title" />
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "./DataGrid.vue";
  import DataGridSummary from "./DataGridSummary.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
  });

  const selectedDateRange = ref({ value: "", label: "" });

  async function reloadData(model) {
    await props.tableStore.reloadData();
  }

  const shouldDisplaySelectedDateRange = computed(() => {
    return (
      selectedDateRange.value.value !== "all" &&
      selectedDateRange.value.value !== 0 &&
      selectedDateRange.value.label !== "shared.labels.0"
    );
  });

  const clearDateRangeFilter = () => {
    selectedDateRange.value = { value: "", label: "" };
    props.gridStore.setDefaultSearchModel();
    reloadData();
  };
</script>
