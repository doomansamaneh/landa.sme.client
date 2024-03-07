<template>
  <span class="text-caption text-on-dark">
    {{ date.toDayString() }} - {{ date.toDateString() }}
  </span>
</template>

<script setup>
import "src/helpers/extensions";
const date = new Date();
</script>
