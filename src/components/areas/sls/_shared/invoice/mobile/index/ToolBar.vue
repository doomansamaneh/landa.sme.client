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
      <q-separator size="0.5px" class="q-my-sm" />
      <menu-item
        :title="$t('shared.labels.editBatch')"
        icon="o_edit"
        @click="editBatch"
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

    <template #advanced-search>
      <advanced-search />
    </template>
  </tool-bar>
</template>

<script setup>
  import { ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    title: String,
    baseRoute: { type: String, default: "sls/quote" },
  });

  const dialog = ref(false);
  const sortSheetStatus = ref(false);

  const showSearchModal = () => {
    dialog.value = true;
  };

  const onSortSheetShow = () => {
    sortSheetStatus.value = true;
  };
</script>
