<template>
  <account-review :title="title" />
</template>

<script setup>
  import AccountReview from "./AccountReview6Col.vue";

  const props = defineProps({
    title: String,
  });
</script>
