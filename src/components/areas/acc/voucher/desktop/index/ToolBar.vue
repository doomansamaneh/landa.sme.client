<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #bootons-edit="{ row }">
      <menu-button-edit :to="`/${baseRoute}/edit/${row.id}`" />
      <menu-button-copy :to="`/${baseRoute}/copy/${row.id}`" />
    </template>

    <template #buttons-custom="{ row }">
      <menu-item
        icon="o_cached"
        :title="$t('shared.labels.reorder')"
        @click="reorder"
      />

      <template v-if="row">
        <q-separator class="q-my-sm" />

        <menu-item-print @click="downloadPdf(row.id)" />
      </template>

      <menu-item
        icon="o_print"
        :title="$t('shared.labels.printBatch')"
        @click="downloadBatchPdf"
      />
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
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
