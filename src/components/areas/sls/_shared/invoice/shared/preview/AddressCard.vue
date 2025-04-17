<template>
  <div
    class="column fit q-pa-md"
    :style="
      $q.dark.isActive
        ? 'border: 1px solid #ffffff'
        : 'border: 1px solid #2d2d2d'
    "
  >
    <div>
      <div style="display: flex; gap: 6px; align-items: center">
        <span class="text-body1 text-bold">{{ title }}:</span>
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="text-body3 q-mt-sm">
      <strong>
        {{ location }}
        -
      </strong>
      <span class="text-wrap">{{ address }}</span>
    </div>
    <div class="q-mt-sm">
      <div style="display: flex; gap: 6px; align-items: center">
        <span class="text-body3 text-bold">کد پستی:</span>
        <span>{{ postalCode }}</span>
      </div>
    </div>
    <div class="q-mt-sm">
      <div style="display: flex; gap: 6px; align-items: center">
        <span class="text-body3 text-bold">تلفن:</span>
        <span>{{ phone }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  });
</script>
