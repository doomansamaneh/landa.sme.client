<template>
  <q-item class="no-padding">
    <q-item-section avatar>
      <q-avatar
        rounded
        text-color="white"
        :icon="icon"
        size="md"
        :class="iconClass"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-h6 text-weight-700">
        {{ title }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
  const props = defineProps({
    title: String,
    icon: String,
    iconClass: String,
  });
</script>
