<template>
  <q-btn size="11px" round unelevated @click="downloadBatchPdf">
    <q-icon size="21px" name="o_print" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2">چاپ دسته‌ای</div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";

  const props = defineProps({
    tableStore: Object,
  });

  const router = useRouter();

  const downloadBatchPdf = () => {
    const baseRoute = router.currentRoute.value.path.slice(1);

    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-invoice"
    );
  };
</script>
