<template>
  <sales-review :title="title" action-name="Purchase" />
</template>

<script setup>
  import SalesReview from "./SalesReview.vue";

  const props = defineProps({
    title: String,
  });
</script>
