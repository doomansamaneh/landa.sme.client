<template>
  <q-btn
    round
    unelevated
    dense
    class="text-on-dark"
    @click="notifDrawerStore.toggle"
  >
    <q-icon
      :class="
        notifDrawerStore.hasUnreadNotifications.value
          ? 'wiggle-on'
          : ''
      "
      name="o_notifications"
    />

    <q-btn
      v-if="notifDrawerStore.hasUnreadNotifications.value"
      color="red"
      round
      unelevated
      size="3px"
      class="absolute-top-right no-pointer-events"
    />
  </q-btn>
</template>

<script setup>
  import { ref } from "vue";
  import { useNotifDrawer } from "src/composables/useNotifDrawer";

  const notifDrawerStore = useNotifDrawer();

  const toggleNotifDrawer = () => {
    notifDrawerStore.state.value = !notifDrawerStore.state.value;
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
