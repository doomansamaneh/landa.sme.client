<template>
  <stock-preview :item="model" v-if="model" />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import StockPreview from "src/components/areas/inv/report/desktop/_ProductStockPreview.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const model = ref(null);
  const crudStore = useFormActions("cmn/product", model);

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
