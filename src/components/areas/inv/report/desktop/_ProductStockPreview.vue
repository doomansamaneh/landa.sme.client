<template>
  <q-card flat bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          icon="o_inventory_2"
          size="md"
          class="primary-gradient primary-shadow"
        />
        <card-title title="کاردکس کالا" />
      </div>
    </div>

    <q-separator size="0.5px" />

    <preview-master :item="item" v-if="item" />
    <preview-detail :item="item" ref="dataGrid" v-if="item" />
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import PreviewMaster from "./_ProductStockPreviewMaster.vue";
  import PreviewDetail from "./_ProductStockPreviewDetail.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    item: Object,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);
  defineExpose({ tableStore });
</script>
