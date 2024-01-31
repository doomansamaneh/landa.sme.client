<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <change-password @submitted="submitted">
      <template #close-icon>
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        />
      </template>
    </change-password>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useDialogPluginComponent } from "quasar"

import ChangePassword from "./ChangePassword.vue"

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

function submitted(response) {
  onDialogOK()
}
</script>
