<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <invite-user @submitted="submitted">
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
    </invite-user>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useDialogPluginComponent } from "quasar"

import InviteUser from "src/components/management/users/InviteUser.vue"

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

function submitted(response) {
  onDialogOK()
}
</script>

<style lang="scss" scoped></style>
