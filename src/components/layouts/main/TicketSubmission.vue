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

  const route = useRoute();
  const unreadCount = ref(0);
  const formStore = useFormActions();
  const getUnreadMessageCount = async () => {
    var data = await formStore.customGetAction(
      "business/getUnreadMessageCount"
    );
    unreadCount.value = data.data;
  };

  const activeButton = computed(() => {
    return route.path === "/tickets" ? "btn-active" : "";
  });

  onMounted(() => {
    getUnreadMessageCount();
  });
</script>
