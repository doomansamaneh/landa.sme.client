<template>
  <q-card flat bordered>
    <card-title title="کاردکس کالا" icon="o_inventory_2" />

    <preview-master :item="item" :title="title" v-if="item" />
    <preview-detail
      :item="item"
      :title="title"
      ref="dataGrid"
      v-if="item"
    />
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import PreviewMaster from "./_ProductStockPreviewMaster.vue";
  import PreviewDetail from "./_ProductStockPreviewDetail.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    item: Object,
    title: String,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);
  defineExpose({ tableStore });
</script>
