<template>
  <span class="text-caption text-on-dark">
    {{ dateString }}
  </span>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import "src/helpers/extensions";

const { locale } = useI18n();
const date = new Date();
const dateString = ref(`${date.toDayString()} - ${date.toDateString()}`);

watch(locale, () => {
  dateString.value = `${date.toDayString()} - ${date.toDateString()}`;
});
</script>
