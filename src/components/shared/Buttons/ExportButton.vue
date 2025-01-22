<template>
  <q-btn size="11px" round unelevated>
    <q-icon size="21px" name="o_download" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2 no-letter-spacing">تبدیل به اکسل</div>
    </q-tooltip>

    <q-menu
      :offset="[0, 10]"
      style="width: 250px"
      class="border-radius-md"
    >
      <q-card class="bordered border-radius-md">
        <q-list dense padding>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="exportAll()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_download" size="20px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.eportToExcel") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="exportCurrentPage()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_download" size="20px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.exportExcelCurrentPage") }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );
</script>
