<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    :base-route="baseRoute"
    search-btn
    sort-btn
  >
    <template #buttons-custom>
      <slot name="buttons-custom"></slot>

      <q-separator size="0.5px" class="q-my-sm" />
      <menu-item
        :title="$t('shared.labels.editBatch')"
        icon="o_edit"
        @click="editBatch"
      />

      <q-separator size="0.5px" class="q-my-sm" />

      <template v-if="tableStore.activeRow?.value">
        <menu-item-print
          :title="$t('shared.labels.downloadPdf')"
          @click="downloadPdf(tableStore.activeRow?.value.id)"
        />
      </template>

      <menu-item-print
        :title="$t('shared.labels.printBatch')"
        @click="downloadBatchPdf"
      />
    </template>

    <template #search-btn-icon>
      <q-icon v-if="searchStore.isFiltered.value" name="filter_alt" />
      <q-icon v-else name="o_filter_alt" />
    </template>

    <template #advanced-search>
      <advanced-search :show-tax-api="showTaxApi" />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    baseRoute: String,
    title: String,
    showTaxApi: Boolean,
  });

  const emits = defineEmits([
    "edit-batch",
    "download-pdf",
    "download-batch-pdf",
  ]);
  const searchStore = useInvoiceSearch();

  const editBatch = () => {
    emits("edit-batch");
  };

  const downloadPdf = (id) => {
    emits("download-pdf", id);
  };

  const downloadBatchPdf = () => {
    emits("download-batch-pdf");
  };
</script>
