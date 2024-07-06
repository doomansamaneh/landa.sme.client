<template>
  <custom-dialog
    ref="dialog"
    :title="$t('shared.labels.settlement')"
    :form="form"
  >
    <template #body>
      <create-form ref="form" :invoice-id="invoiceId" />
    </template>

    <template #actions>
      <action-buttons @ok-clicked="submitForm">
        <template #ok-label>
          <q-icon size="20px" name="save" class="q-mx-sm" />
          {{ $t("shared.labels.save") }}
        </template>
      </action-buttons>
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CreateForm from "./CreateForm.vue";
  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    invoiceId: String,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const responseData = await form.value.submitForm();
    if (responseData) {
      dialog.value.onDialogOK();
    } else {
    }
  }
</script>
