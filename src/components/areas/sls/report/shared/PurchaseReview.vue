<template>
  <sales-review :title="title" action-name="Purchase">
    <template #item-preview="{ item }">
      <purchase-preview :id="item.invoiceId" inside />
    </template>
  </sales-review>
</template>

<script setup>
  import SalesReview from "./SalesReview.vue";
  import PurchasePreview from "../../purchase/shared/preview/IndexView.vue";

  const props = defineProps({
    title: String,
  });
</script>
