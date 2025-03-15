<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    maximized
  >
    <delete-business @submitted="submitted">
      <template #close-icon>
        <close-button v-close-popup />
      </template>
    </delete-business>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent } from "quasar";

  import deleteBusiness from "src/components/management/business/DeleteBusiness.vue";
  import CloseButton from "src/components/shared/Buttons/CloseButton.vue";
  
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function submitted(response) {
    onDialogOK();
  }
</script>

<style lang="scss" scoped></style>
