<template>
  <q-card-actions
    class="q-pa-md dark-1"
    :class="$q.screen.xs ? 'fixed-bottom' : ''"
  >
    <slot name="start"></slot>
    <slot name="ok">
      <q-btn
        no-caps
        type="submit"
        @click="okClicked"
        text-color="white"
        unelevated
        padding="8px 16px"
        rounded
        class="primary-gradient primary-shadow"
      >
        <slot name="ok-label">{{ $t("shared.labels.save") }}</slot>
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
  const emit = defineEmits(["ok-clicked", "cancel-clicked"]);

  function okClicked() {
    emit("ok-clicked");
  }

  function cancelClicked() {
    emit("cancel-clicked");
  }
</script>
