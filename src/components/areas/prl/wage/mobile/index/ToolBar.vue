<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :title="title"
    activation_
    search-btn
    sort-btn
  >
    <template #header-title>
      <span class="text-body2">
        {{ title }}
      </span>
    </template>

    <template #buttons-custom>
      <template v-if="row">
        <menu-item
          icon="o_save"
          :title="$t('shared.labels.downloadInsurrance')"
          @click="exportInsurance(row.id)"
        />

        <menu-item
          icon="o_save"
          :title="$t('shared.labels.downloadTax')"
          @click="exportTax(row.id)"
        />
        <q-separator size="0.5px" class="q-my-sm" />

        <menu-item-print @click="downloadPdf(row.id)" />
      </template>

      <!-- <menu-item
        :title="$t('shared.labels.printBatch')"
        icon="o_print"
        @click="downloadBatchPdf"
      /> -->
    </template>
  </tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "components/shared/ToolBarMobile.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: String,
  });

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "export-tax",
    "export-insurance",
  ]);

  function downloadPdf(id) {
    emits("download-pdf", id);
  }

  function downloadBatchPdf() {
    emits("download-batch-pdf");
  }

  function exportInsurance(id) {
    emits("export-insurance", id);
  }

  function exportTax(id) {
    emits("export-tax", id);
  }
</script>
