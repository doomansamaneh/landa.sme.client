<template>
  <q-btn no-caps size="11px" round unelevated @click="openPreview">
    <q-icon size="21px" name="o_print" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2">پیش نمایش و چاپ</div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  import { usePreview } from "src/composables/usePreview";

  import DataGridDefaultPreview from "src/components/shared/DataTables/printPreview/DataGridDefaultPreview.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
    previewComponent: {
      type: Object,
      default: () => DataGridDefaultPreview,
    },
  });

  const previewStore = usePreview();

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: props.previewComponent,
      previewProps: {
        tableStore: props.tableStore,
        title: props.title,
      },
    });
  };
</script>
