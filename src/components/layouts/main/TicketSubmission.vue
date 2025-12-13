<template>
  <q-btn
    no-caps
    unelevated
    rounded
    to="/tickets"
    :class="activeButton"
    class="bordered text-on-dark gt-xs"
  >
    <q-icon name="support_agent" class="q-mr-sm" />
    <div class="text-body2">{{ $t("shared.labels.support") }}</div>
    <q-badge
      v-if="unreadCount > 0"
      floating
      color="red"
      text-color="white"
      :label="unreadCount"
    />
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { useUnreadMessage } from "src/composables/useUnreadMessage";

  const route = useRoute();

  const { unreadCount } = useUnreadMessage();

  const activeButton = computed(() => {
    return route.path === "/tickets" ? "btn-active" : "";
  });
</script>
