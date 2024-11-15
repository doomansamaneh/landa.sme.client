<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile :title="title" @download-pdf="downloadPdf" />
  </template>
  <template v-else>
    <toolbar-desktop buttons margin @download-pdf="downloadPdf" />
  </template>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { downloadManager } from "src/helpers";

  import ToolbarMobile from "src/components/areas/acc/report/shared/IncomeStatement/mobile/index/_ToolBar.vue";
  import ToolbarDesktop from "src/components/areas/acc/report/shared/IncomeStatement/desktop/index/_ToolBar.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
  });

  const baseRoute = "acc/report";
  const $q = useQuasar();

  function downloadPdf() {
    downloadManager.downloadGet(
      `${baseRoute}/GenerateIncomeStatementPdf`,
      "landa-income-statement"
    );
  }
</script>
