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
    <div class="text-body2">{{ $t("shared.labels.support") }}</div>
    <q-badge
      v-if="unreadCount > 0"
      floating
      color="red"
      text-color="white"
      :label="unreadCount"
      class="q-ml-sm"
    />
  </q-btn>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import usePolling from "src/composables/usePolling"; // import the polling composable

  const route = useRoute();
  const unreadCount = ref(0);
  const formStore = useFormActions();

  // Add silent variable
  const silent = true;

  const getUnreadMessageCount = async () => {
    const data = await formStore.customGetAction(
      "business/getUnreadMessageCount",
      silent
    );
    unreadCount.value = data.data;
  };

  const { start, clear } = usePolling(getUnreadMessageCount, 10000); // poll every 10s

  const activeButton = computed(() => {
    return route.path === "/tickets" ? "btn-active" : "";
  });

  onMounted(() => {
    getUnreadMessageCount(); // initial fetch
    start(); // start polling
  });
</script>
