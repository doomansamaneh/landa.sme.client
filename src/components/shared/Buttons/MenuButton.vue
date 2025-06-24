<template>
  <q-btn
    class="text-body2"
    rounded
    unelevated
    no-caps
    padding="8px 16px"
    :to="to"
    @click="click"
    :id="id"
  >
    <slot></slot>
    <q-icon v-if="icon" size="20px" :name="icon" class="q-mr-xs" />
    {{ title }}
    <q-badge v-if="badgeCount" floating>
      {{ badgeCount }}
    </q-badge>
    <slot name="append"></slot>
    <slot></slot>
  </q-btn>
</template>
<script setup>
  const props = defineProps({
    icon: String,
    title: String,
    to: String,
    badgeCount: Number,
    id: String,
  });

  const emits = defineEmits(["click"]);

  const click = () => {
    emits("click");
  };
</script>
