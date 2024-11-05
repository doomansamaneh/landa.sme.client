<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
    />
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";

  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarMobile from "src/components/areas/acc/report/shared/IncomeStatement/mobile/index/_ToolBar.vue";
  import ToolbarDesktop from "src/components/areas/acc/report/shared/IncomeStatement/desktop/index/_ToolBar.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "acc/report";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function downloadPdf() {
    downloadManager.downloadGet(
      `${baseRoute}/GeneratePdf/${props.tableStore.activeRow.value.id}`,
      "landa-quote"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-quote"
    );
  }
</script>
