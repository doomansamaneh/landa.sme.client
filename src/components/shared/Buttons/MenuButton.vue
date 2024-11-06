<template>
  <q-btn
    class="text-body2 no-letter-spacing"
    rounded
    unelevated
    no-caps
    :to="to"
    @click="click"
  >
    <q-icon v-if="icon" size="20px" :name="icon" class="q-mr-xs" />
    {{ title }}
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
