<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    maximized
  >
    <delete-business :id="id" @submitted="submitted">
      <template #close-icon>
        <close-button v-close-popup />
      </template>
    </delete-business>
  </q-dialog>
</template>

<script setup>
  import { useDialogPluginComponent } from "quasar";

  import DeleteBusiness from "src/components/management/business/DeleteBusiness.vue";
  import CloseButton from "src/components/shared/buttons/CloseButton.vue";

  const props = defineProps({
    id: String,
  });

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function submitted(response) {
    onDialogOK();
  }
</script>
