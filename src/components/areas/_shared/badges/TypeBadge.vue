<template>
  <q-btn
    v-if="title"
    no-caps
    unelevated
    padding="0 8px"
    :class="badgeClasses"
    :style="badgeStyles"
  >
    {{ title }}
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers/helper";

  const props = defineProps({
    title: String,
    typeId: String,
  });

  const badgeClasses = computed(() => [
    "text-center text-caption-xs border-radius-lg no-pointer-events",
    props.typeId ? "text-white" : "primary-gradient text-white",
  ]);

  const badgeStyles = computed(() => {
    const base = { whiteSpace: "nowrap" };
    return props.typeId
      ? { ...base, ...helper.generateGradientStyle(props.typeId) }
      : base;
  });
</script>
