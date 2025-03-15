<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    maximized
  >
    <change-password @submitted="submitted" />
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent } from "quasar";

  import ChangePassword from "./ChangePassword.vue";

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function submitted(response) {
    onDialogOK();
  }
</script>
