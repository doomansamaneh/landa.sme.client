<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.closeAccount')"
    :form="form"
  >
    <template #body>
      <close-account-form ref="form" />
    </template>

    <template #actions>
      <actions @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import CloseAccountForm from "./CloseAccountForm.vue";
  import Actions from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    selectedIds: Array,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK();
  }
</script>
