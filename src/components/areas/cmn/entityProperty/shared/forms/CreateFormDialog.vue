<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.entityProperty')"
  >
    <template #body>
      <create-form
        ref="form"
        :id="id"
        :entity-id="entityId"
        :entity-name="entityName"
        :action="action"
      />
    </template>

    <template #actions>
      <action-buttons @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CreateForm from "./CreateForm.vue";
  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    id: String,
    entityId: String,
    entityName: String,
    action: String,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK(response);
  }
</script>
