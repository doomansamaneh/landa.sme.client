<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :title="title"
    search-btn_
    sort-btn
  >
    <template #buttons-custom>
      <template v-if="tableStore.activeRow?.value">
        <q-separator size="0.5px" class="q-my-sm" />
        <menu-item-print @click="downloadPdf" />
      </template>
    </template>

    <template #search-btn-icon>
      <q-icon v-if="searchStore.isFiltered.value" name="filter_alt" />
      <q-icon v-else name="o_filter_alt" />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "components/shared/ToolBarMobile.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: String,
  });

  const emits = defineEmits(["downloadPdf", "download-batch-pdf"]);

  function downloadPdf(id) {
    emits("download-pdf", id);
  }
</script>
