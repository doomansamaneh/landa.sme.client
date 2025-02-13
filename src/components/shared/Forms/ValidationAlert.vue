<template>
  <q-tooltip
    v-if="message"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    :class="tooltipClass"
  >
    <slot />
    <div class="text-body2">
      {{ message }}
    </div>
  </q-tooltip>
</template>

<script setup>
  const props = defineProps({
    message: String,
    transitionShow: { type: String, default: "jump-down" },
    transitionHide: { type: String, default: "jump-up" },
    anchor: { type: String, default: "bottom start" },
    self: { type: String, default: "bottom right" },
    offset: { type: Array, default: () => [0, 40] },
    tooltipClass: {
      type: String,
      default:
        "border-radius-xs bg-negative red-shadow text-white q-pa-sm",
    },
  });
</script>
