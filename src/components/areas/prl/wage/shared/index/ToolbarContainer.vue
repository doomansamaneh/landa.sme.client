<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      @download-pdf="downloadPdf"
      @download-pdf-batch="downloadBatchPdf"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @download-pdf="downloadPdf"
      @export-tax="exportTax"
      @export-insurance="exportInsurance"
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

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const $q = useQuasar();

  const crudStore = useFormActions(props.baseRoute);

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function downloadPdf(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${id}`,
      "landa-payroll"
    );
  }

  function downloadBatchPdf() {
    downloadManager.downloadPost(
      `${props.baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-payroll"
    );
  }

  function exportTax(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${id}`,
      "landa-tax"
    );
  }

  function exportInsurance(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${id}`,
      "landa-insurance"
    );
  }
</script>
