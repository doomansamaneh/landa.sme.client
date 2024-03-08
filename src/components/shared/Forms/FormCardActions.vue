<template>
  <q-card-actions class="q-pa-md dark-1">
    <slot name="start"></slot>
    <slot name="ok">
      <q-btn
        type="submit"
        @click="okClicked"
        color="primary"
        unelevated
        no-caps
        padding="8px 16px"
        rounded
      >
        <slot name="ok-label">
          {{ $t("shared.labels.save") }}
        </slot>
      </q-btn>
    </slot>
    <slot name="between"></slot>
    <slot name="cancel">
      <q-btn
        flat
        size="md"
        @click="cancelClicked"
        no-caps
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
const emit = defineEmits(["ok-clicked", "cancel-clicked"])

function okClicked() {
  emit("ok-clicked")
}

function cancelClicked() {
  emit("cancel-clicked")
}
</script>
