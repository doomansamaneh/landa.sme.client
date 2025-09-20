<template>
  <q-form ref="form" autofocus_>
    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.docNo"
          :label="$t('shared.labels.receiptNumber')"
        />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <date-time
          v-model="model.date"
          :label="$t('shared.labels.date')"
          required
        />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <bank-account-lookup
          v-model:selectedId="model.bankAccountId"
          v-model:selectedText="model.bankAccountDisplay"
          :label="$t('shared.columns.bankAccount')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.comment"
          type="textarea"
          :label="$t('shared.labels.comment')"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useFormActions } from "src/composables/useFormActions";

  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    action: String,
    title: String,
    id: String,
    item: Object,
  });

  const form = ref(null);
  const model = ref({});
  const baseUrl = "trs/PaymentItemCheck";
  const formStore = useFormActions(baseUrl, model);

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  onMounted(() => {
    formStore.getById(props.id, `${baseUrl}/GetCheckFlowModel`);
  });

  defineExpose({
    submitForm,
  });
</script>
