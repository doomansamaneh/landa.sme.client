<template>
  <router-link class="no-decoration" :to="to">
    <q-icon :name="icon" size="xs" class="q-mr-xs" :class="color" />
    <span class="decoration-on-hover" :class="color">
      {{ title }}
    </span>
  </router-link>
</template>
<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    to: String,
    title: String,
    icon: {
      type: String,
      default: "o_description",
    },
  });

  const $q = useQuasar();
  const color = computed(() =>
    $q.dark.isActive ? "text-yellow" : "text-primary"
  );
</script>
