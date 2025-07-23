<template>
  <q-btn
    no-caps
    v-if="false"
    :size="$q.screen.xs ? '10px' : ''"
    round
    unelevated
    dense
    class="text-on-dark"
    :class="activeButton"
    @click="toggleNotifDrawer"
  >
    <q-icon
      :size="$q.screen.xs ? '24px' : ''"
      :class="
        notifDrawerStore.hasUnreadNotifications.value
          ? 'wiggle-on'
          : ''
      "
      name="o_notifications"
    />

    <q-btn
      no-caps
      v-if="notifDrawerStore.hasUnreadNotifications.value"
      color="red"
      round
      unelevated
      size="3px"
      class="absolute-top-right no-pointer-events"
      style="margin-top: 2px; margin-left: 2px"
    />
  </q-btn>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useNotifDrawer } from "src/composables/useNotifDrawer";
  import { useContactDrawer } from "src/composables/useContactDrawer";

  const notifDrawerStore = useNotifDrawer();
  const contactDrawerStore = useContactDrawer();

  const activeButton = computed(() =>
    notifDrawerStore.state.value == true ? "btn-active" : ""
  );

  const toggleNotifDrawer = () => {
    notifDrawerStore.toggle();
    if (contactDrawerStore.state.value) {
      contactDrawerStore.state.value = false;
    }
  };
</script>

<style>
  @keyframes notif-wiggle {
    0%,
    100% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }

  .wiggle-on {
    animation: notif-wiggle 0.5s ease infinite;
  }
</style>
