<template>
  <custom-dialog
    ref="dialog"
    :form="form"
  >
    <template #title>
      <div class="row items-center q-gutter-sm">
        <div class="text-h6">
          {{
            $t("shared.labels.create") +
            " " +
            $t("main-menu-items.Acc_AccountSL_View")
          }}
        </div>

        <q-btn round dense unelevated>
          <q-icon size="20px" name="o_info" />

          <q-menu class="border-radius-xl q-ma-xl">
            <form-guide />
          </q-menu>
        </q-btn>
      </div>
    </template>
    <template #body>
      <create-form />
    </template>

    <template #actions>
      <actions @ok-clicked="submitForm" />
    </template>
  </custom-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import CustomDialog from "src/components/shared/CustomDialog.vue";
  import CreateForm from "./CreateForm.vue";
  import Actions from "src/components/shared/forms/FormCardActions.vue";
  import FormGuide from "./FormGuide.vue"

  const form = ref(null);
  const dialog = ref(null);

  async function submitForm() {
    const response = await form.value.submitForm();
    if (response) dialog.value.onDialogOK();
  }
</script>
