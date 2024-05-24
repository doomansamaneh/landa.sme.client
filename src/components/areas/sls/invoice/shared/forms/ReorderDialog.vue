<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.reorder')"
    :form="form"
  >
    <template #body>
      <reorder-form ref="form" />
    </template>

    <template #actions>
      <actions @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ReorderForm from "./ReorderForm.vue";
  import Actions from "src/components/shared/forms/FormCardActions.vue";

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK();
  }
</script>
