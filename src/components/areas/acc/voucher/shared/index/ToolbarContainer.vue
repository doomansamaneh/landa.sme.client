<template>
  <!-- <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @reorder="operationStore.reorder(tableStore.reloadData)"
    ></toolbar-mobile>
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @reorder="operationStore.reorder(tableStore.reloadData)"
    ></toolbar-desktop>
  </template> -->

  <toolbar-mobile
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    :base-route="baseRoute"
    :selected-ids="selectedIds"
    @reorder="operationStore.reorder(tableStore.reloadData)"
    @download-pdf="downloadPdf"
    @download-pdf-batch="downloadBatchPdf"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";

  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountingOperations } from "../../../_composables/useAccountingOperations";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "acc/voucher";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);
  const operationStore = useAccountingOperations();

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function downloadPdf() {
    downloadManager.downloadGet(
      `${baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
      "landa-voucher"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-voucher"
    );
  }
</script>
