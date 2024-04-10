<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <edit-profile />
  </q-dialog>
</template>

<script setup>
import CreateForm from "../forms/CreateForm.vue";
</script>
