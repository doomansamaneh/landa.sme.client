<template>
  <stock-preview
    :item="model"
    :inside="inside"
  />
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";

  import StockPreview from "../desktop/ProductStockPreview.vue";
  import { useFormActions } from "src/composables/useFormActions";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const route = useRoute();
  const model = ref(null);
  const formStore = useFormActions("cmn/product", model);
  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
