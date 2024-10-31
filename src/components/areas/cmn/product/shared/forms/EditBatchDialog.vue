<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.editBatch')"
    :form="form"
  >
    <template #body>
      <edit-batch-form ref="form" :selectedIds="selectedIds" />
    </template>

    <template #actions>
      <actions @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import EditBatchForm from "./EditBatchForm.vue";
  import Actions from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    id: String,
    selectedIds: Array,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK();
  }
</script>
