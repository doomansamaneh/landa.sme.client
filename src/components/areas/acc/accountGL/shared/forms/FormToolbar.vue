<template>
  <tool-bar :title="title" @submit-call-back="onSubmit" />
</template>

<script setup>
  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";

  const props = defineProps({
    title: String,
    onSubmit: Function,
  });
</script>
