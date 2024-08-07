<template>
  <q-card flat bordered>
    <q-card-section class="text-center">
      <span class="text-weight-700 text-h6 no-letter-spacing">
        کاردکس کالا
      </span>
    </q-card-section>
    <q-separator />

    <preview-master :item="item" v-if="item" />
    <preview-detail :item="item" ref="dataGrid" v-if="item" />
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import PreviewMaster from "./_ProductStockPreviewMaster.vue";
  import PreviewDetail from "./_ProductStockPreviewDetail.vue";

  const props = defineProps({
    item: Object,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);
  defineExpose({ tableStore });
</script>
