<template>
  <q-btn
    no-caps
    v-if="title"
    padding="0 8px"
    unelevated
    class="text-center text-caption-xs text-white border-radius-lg no-pointer-events"
    :style="[
      { whiteSpace: 'nowrap' },
      typeId
        ? helper.generateGradientStyle(typeId)
        : { background: 'primary-gradient' },
    ]"
  >
    {{ title }}
  </q-btn>
</template>

<script setup>
  import { helper } from "src/helpers/helper";

  const props = defineProps({
    title: String,
    typeId: String,
  });
</script>
