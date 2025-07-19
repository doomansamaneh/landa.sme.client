<template>
  <q-btn
    no-caps
    unelevated
    rounded
    dense
    padding="4px 12px"
    size="14px"
    to="/tickets"
    :class="activeButton"
    class="bordered text-on-dark gt-xs"
  >
    <q-icon name="support_agent" class="q-mr-sm" />
    <div class="text-body2">پشتیبانی</div>
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const activeButton = computed(() => {
    return route.path === "/tickets" ? "btn-active" : "";
  });
</script>
