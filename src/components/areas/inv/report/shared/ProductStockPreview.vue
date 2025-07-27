<template>
  <stock-preview
    v-if="item"
    :item="item"
    :title="title"
    :inside="inside"
  />
</template>

<script setup>
  // import { computed, onMounted, ref } from "vue";
  // import { useRoute } from "vue-router";
  // import { useFormActions } from "src/composables/useFormActions";

  import StockPreview from "../desktop/ProductStockPreview.vue";

  const props = defineProps({
    inside: Boolean,
    title: String,
    item: Object,
  });

  // const route = useRoute();
  // const model = ref(null);
  // const formStore = useFormActions("cmn/product", model);
  // const id = computed(() => props.item?.id ?? route.params.id);

  // onMounted(() => {
  //   formStore.getById(id.value);
  // });
</script>
