<template>
  <q-btn
    class="text-body2 no-letter-spacing"
    padding="6px 12px"
    rounded
    unelevated
    no-caps
    :to="to"
    @click="click"
  >
    <q-icon v-if="icon" size="20px" :name="icon" class="q-mr-xs" />
    1. {{ title }}
    <q-badge v-if="badgeCount" floating>
      {{ badgeCount }}
    </q-badge>
    <slot name="append"></slot>
  </q-btn>
</template>
<script setup>
  const props = defineProps({
    icon: String,
    title: String,
    to: String,
    badgeCount: Number,
  });

  const emits = defineEmits(["click"]);

  const click = () => {
    emits("click");
  };
</script>
