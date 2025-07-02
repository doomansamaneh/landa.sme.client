<template>
  <q-btn
    no-caps
    unelevated
    :rounded="$q.screen.gt.xs"
    :round="$q.screen.xs"
    :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
  >
    <q-icon
      v-if="icon"
      size="20px"
      :name="icon"
      :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
    />
    <span v-if="title && $q.screen.gt.xs">{{ title }}</span>
  </q-btn>
</template>

<script setup>
  import { useQuasar } from "quasar";

  const props = defineProps({
    icon: String,
    title: String,
  });
  const $q = useQuasar();
</script>
