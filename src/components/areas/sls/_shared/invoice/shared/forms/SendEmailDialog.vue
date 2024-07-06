<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.sendMail')"
    :form="form"
  >
    <template #body>
      <send-email-form ref="form" :id="id" :base-route="baseRoute" />
    </template>

    <template #actions>
      <action-buttons @ok-clicked="submitForm">
        <template #ok-label>
          <q-icon size="20px" name="send" class="q-mx-sm" />
          {{ $t("shared.labels.send") }}
        </template>
      </action-buttons>
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import SendEmailForm from "./SendEmailForm.vue";
  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    id: String,
    baseRoute: String,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK();
  }
</script>
