<template>
  <q-card class="fit bordered no-padding" flat>
    <q-card-section class="col q-px-lg">
      <div class="text-h6 text-bold q-mt-sm q-mb-xs">
        {{ helper.formatNumber(value) }}
      </div>
      <div class="text-body3">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    value: Number,
    title: String,
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    gap: 24px;
  }
</style>
