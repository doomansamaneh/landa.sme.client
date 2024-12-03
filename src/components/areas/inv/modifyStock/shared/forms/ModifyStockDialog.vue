<template>
  <custom-dialog
    ref="dialog"
    :title="$t('main-menu-items.Inv_ModifyStock_View')"
  >
    <template #body>
      <modify-stock-form ref="form" :id="id" />
    </template>

    <template #actions>
      <action-buttons @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import ModifyStockForm from "./ModifyStockForm.vue";
  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    id: String,
  });

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK(response);
  }
</script>
