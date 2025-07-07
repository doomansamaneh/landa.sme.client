<template>
  <q-btn
    no-caps
    round
    dense
    unelevated
    class="text-on-dark"
    icon="o_table_chart"
    @click="exportAllExcel"
  >
    <q-tooltip class="custom-tooltip" :delay="600">
      {{ $t("shared.labels.exportExcel") }}
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  import { useDataTableExport } from "src/composables/useDataTableExport";

  const props = defineProps({
    tableStore: {
      type: Object,
      required: true,
    },
  });

  const { exportAll, exportAllExcel } = useDataTableExport(
    props.tableStore
  );

  // function exportToExcel() {
  //   const columns = props.tableStore.columns.value.map((col) => ({
  //     label: col.label,
  //     field: col.field,
  //     format: col.format,
  //   }));

  //   const rows = props.tableStore.rows.value;
  //   const fileName = `${props.tableStore.title || "export"}.xlsx`;

  //   helper.exportExcel(rows, columns, fileName);
  // }
</script>
