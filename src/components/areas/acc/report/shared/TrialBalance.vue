<template>
  <account-review :title="title" />
</template>

<script setup>
  import AccountReview from "./AccountReview.vue";

  const props = defineProps({
    title: String,
  });
</script>
