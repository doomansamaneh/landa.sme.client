<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    :maximized="$q.screen.xs"
  >
    <change-password
      :style="$q.screen.gt.xs ? 'width: 400px' : ''"
      @submitted="submitted"
    >
      <template #header>
        <q-card-section>
          <div class="flex justify-between items-center">
            <div class="text-body2 text-bold">تغییر رمز عبور</div>
            <close-button v-close-popup />
          </div>
        </q-card-section>
      </template>
    </change-password>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent } from "quasar";

  import ChangePassword from "./ChangePassword.vue";
  import CloseButton from "src/components/shared/buttons/CloseButton.vue";

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function submitted(response) {
    onDialogOK();
  }
</script>
