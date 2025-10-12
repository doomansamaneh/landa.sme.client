<template>
  <q-card-actions
    class="q-pa-md bg-on-dark"
    :class="$q.screen.xs ? 'fixed-bottom' : ''"
  >
    <slot name="start"></slot>
    <slot name="ok">
      <q-btn
        no-caps
        type="submit"
        @click="okClicked"
        unelevated
        padding="8px 16px"
        rounded
        class="primary-gradient primary-shadow text-white"
      >
        <slot name="ok-label">
          {{ $t(okLabel || "shared.labels.save") }}
        </slot>
      </q-btn>
    </slot>
    <slot name="between"></slot>
    <slot name="cancel">
      <q-btn
        no-caps
        flat
        size="md"
        @click="cancelClicked"
        padding="8px 16px"
        v-close-popup
        rounded
      >
        <slot name="cancel-label">
          {{ $t("shared.labels.cancel") }}
        </slot>
      </q-btn>
    </slot>
    <slot name="end"></slot>
  </q-card-actions>
</template>

<script setup>
  const props = defineProps({
    okLabel: String,
  });

  const emit = defineEmits(["ok-clicked", "cancel-clicked"]);

  function okClicked() {
    emit("ok-clicked");
  }

  function cancelClicked() {
    emit("cancel-clicked");
  }
</script>
