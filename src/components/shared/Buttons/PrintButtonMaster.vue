<template>
  <q-btn size="11px" round unelevated>
    <q-icon size="21px" name="o_print" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2 no-letter-spacing">چاپ</div>
    </q-tooltip>
    <q-menu class="border-radius-lg" cover>
      <q-list dense padding style="width: 200px">
        <menu-item icon="o_print" title="چاپ" @click="openPreview" />
        <menu-item
          icon="o_print"
          title="چاپ دسته‌ای"
          @click="downloadBatchPdf"
        />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";
  import { usePreview } from "src/composables/usePreview";

  import DataGridDefualtPreview from "src/components/shared/dataTables/printPreview/DataGridDefualtPreview.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });

  const router = useRouter();
  const previewStore = usePreview();

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridDefualtPreview,
      previewProps: {
        tableStore: props.tableStore,
        title: props.title,
      },
    });
  };

  const downloadBatchPdf = () => {
    const baseRoute = router.currentRoute.value.path.slice(1);

    downloadManager.downloadPost(
      `${baseRoute}/GenerateBatchPdf`,
      props.tableStore.pagination.value,
      "landa-invoice"
    );
  };
</script>
