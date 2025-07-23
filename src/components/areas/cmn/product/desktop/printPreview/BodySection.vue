<template>
  <body-section :tableStore="tableStore">
    <template #cell-isActive="{ item }">
      <q-btn
        no-caps
        v-if="item.isActive"
        round
        dense
        size="10px"
        unelevated
        icon="o_done"
        text-color="white"
        class="green-gradient green-shadow no-pointer-events"
      />
      <q-btn
        no-caps
        v-else
        round
        dense
        size="10px"
        unelevated
        icon="o_close"
        text-color="white"
        class="red-gradient red-shadow no-pointer-events"
      />
    </template>
  </body-section>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import BodySection from "src/components/shared/dataTables/printPreview/BodySection.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const isNumber = (value) =>
    typeof value === "number" && !isNaN(value);
</script>

<style lang="scss" scoped>
  .print-preview-table {
    width: 100%;
    border-collapse: collapse;
  }
  .print-preview-table th,
  .print-preview-table td {
    border: 1px solid black;
    padding: 5px;
    text-align: start;
  }
  .print-preview-table th {
    background-color: #f2f2f2;
  }
</style>
