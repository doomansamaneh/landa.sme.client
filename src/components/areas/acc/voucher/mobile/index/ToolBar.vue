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
    <template #buttons-custom>
      <menu-item
        :title="$t('shared.labels.reorder')"
        icon="cached"
        @click="reorder"
      />

      <q-separator size="0.5px" class="q-my-sm" />

      <template v-if="tableStore.activeRow?.value">
        <menu-item-print @click="downloadPdf" />
      </template>

      <menu-item
        :title="$t('shared.labels.printBatch')"
        icon="o_print"
        @click="downloadBatchPdf"
      />
    </template>

    <template #search-btn-icon>
      <q-icon v-if="searchStore.isFiltered.value" name="filter_alt" />
      <q-icon v-else name="o_filter_alt" />
    </template>

    <template #advanced-search>
      <advanced-search />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";

  import ToolBar from "components/shared/ToolBarMobile.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/voucher" },
  });

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "reorder",
  ]);

  const searchStore = useVoucherSearch();

  function downloadPdf(id) {
    emits("download-pdf", id);
  }

  function downloadBatchPdf() {
    emits("download-batch-pdf");
  }

  function reorder() {
    emits("reorder");
  }
</script>
