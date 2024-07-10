<template>
  <custom-dialog
    ref="dialog"
    :title="$t(`shared.contactType.${currentContactType}`)"
  >
    <template #body>
      <create-form
        ref="form"
        :id="id"
        :type-id="typeId"
        :customer-id="customerId"
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
  import { helper } from "src/helpers";
  import { contactType } from "src/constants";

  import CreateForm from "./CreateForm.vue";
  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    id: String,
    customerId: String,
    typeId: Number,
    action: String,
  });

  const form = ref(null);
  const dialog = ref(null);

  const currentContactType = helper.getEnumType(
    props.typeId,
    contactType
  );

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK(response);
  }
</script>
