<template>
  <q-btn size="11px" round unelevated @click="openPreview">
    <q-icon size="21px" name="o_print" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2 no-letter-spacing">پیش نمایش و چاپ</div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  import { usePreview } from "src/composables/usePreview";

  import DataGridDefaultPreview from "src/components/shared/dataTables/printPreview/DataGridDefaultPreview.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });

  const previewStore = usePreview();

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridDefaultPreview,
      previewProps: {
        tableStore: props.tableStore,
        title: props.title,
      },
    });
  };
</script>
