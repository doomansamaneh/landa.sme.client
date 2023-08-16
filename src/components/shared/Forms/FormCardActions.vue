<template>
  <q-card-actions class="q-pa-md dark-1">
    <slot name="start"></slot>
    <slot name="ok">
      <q-btn type="submit" @click="okClicked" color="light-blue-6" unelevated no-caps padding="8px 16px">
        <slot name="ok-label">
          {{ $t('shared.labels.save') }}
        </slot>
      </q-btn>
    </slot>
    <slot name="between"></slot>
    <slot name="cancel">
      <q-btn flat size="md" @click="cancelClicked" no-caps padding="8px 16px" v-close-popup>
        <slot name="cancel-label">
          {{ $t('shared.labels.cancel') }}
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
    emit("canel-clicked")
  }
</script>