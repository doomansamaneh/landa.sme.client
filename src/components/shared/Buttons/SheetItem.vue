<template>
  <q-item clickable v-ripple :to="to" @click="click">
    <q-item-section v-if="icon" avatar>
      <q-avatar class="bg-on-dark text-on-dark" :icon="icon" />
    </q-item-section>

    <q-item-section class="text-body1 no-letter-spacing">
      {{ title }}
    </q-item-section>
  </q-item>
</template>
<script setup>
  const props = defineProps({
    icon: String,
    title: String,
    to: String,
  });

  const emits = defineEmits(["click"]);

  const click = () => {
    emits("click");
  };
</script>
