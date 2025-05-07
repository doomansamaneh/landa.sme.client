<template>
  <q-btn round dense unelevated class="text-on-dark">
    <q-icon name="o_download" />
    <q-tooltip class="custom-tooltip" :delay="600">
      {{ $t("shared.labels.export") }}
    </q-tooltip>

    <q-menu
      :offset="[0, 10]"
      style="width: 250px"
      class="border-radius-md"
    >
      <q-card class="bordered border-radius-md">
        <q-list dense padding>
          <menu-item
            icon="o_table_chart"
            :title="$t('shared.labels.exportExcel')"
            @click="exportToExcel"
          />
          <menu-item
            icon="o_description"
            :title="$t('shared.labels.exportCsv')"
            @click="exportToCsv"
          />
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { helper } from "src/helpers";
  import MenuItem from "./MenuItem.vue";

  const props = defineProps({
    tableStore: {
      type: Object,
      required: true,
    },
  });

  function exportToExcel() {
    const columns = props.tableStore.columns.value.map((col) => ({
      label: col.label,
      field: col.field,
      format: col.format,
    }));

    const rows = props.tableStore.rows.value;
    helper.exportExcel(rows, columns);
  }

  function exportToCsv() {
    const columns = props.tableStore.columns.value.map((col) => ({
      label: col.label,
      field: col.field,
      format: col.format,
    }));

    const rows = props.tableStore.rows.value;
    helper.exportCsv(rows, columns);
  }
</script>
