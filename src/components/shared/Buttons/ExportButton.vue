<template>
  <q-btn no-caps round dense unelevated class="text-on-dark">
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
            @click="exportAllExcel"
          />
          <menu-item
            icon="o_description"
            :title="$t('shared.labels.exportCsv')"
            @click="exportAll"
          />
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import MenuItem from "./MenuItem.vue";

  const props = defineProps({
    tableStore: {
      type: Object,
      required: true,
    },
  });

  const { exportAll, exportAllExcel } = useDataTableExport(
    props.tableStore
  );
</script>
