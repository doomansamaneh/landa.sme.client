<template>
  <q-card flat bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          title="کاردکس کالا"
          icon="o_inventory_2"
        />
      </div>
    </div>

    <q-separator size="1px" />

    <preview-master :item="item" v-if="item" />
    <preview-detail :item="item" ref="dataGrid" v-if="item" />
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import PreviewMaster from "./_ProductStockPreviewMaster.vue";
  import PreviewDetail from "./_ProductStockPreviewDetail.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    item: Object,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);
  defineExpose({ tableStore });
</script>
