<template>
  <q-form ref="form" autofocus>
    <div class="row q-mb-md">
      <div class="col-md-4 col-sm-12 col-xs-12">
        <date-time
          label="تاریخ"
          v-model="formStore.model.value.date"
        />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <sl-lookup
          label="حساب مقصد"
          v-model:selectedId="formStore.model.value.destinationSLId"
          v-model:selectedText="
            formStore.model.value.destinationSLTitle
          "
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <custom-input
          label="شرح"
          v-model="formStore.model.value.subject"
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-option-group
          label="نوع حساب"
          class="q-pt-sm flex q-gutter-md"
          size="46px"
          dense
          :options="
            helper.getEnumOptions(closeAccounts, 'closeAccounts')
          "
          type="checkbox"
          v-model="formStore.model.value.closeAccounts"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { closeAccounts } from "src/constants";
  import { useAccountingOperations } from "../../_composables/useAccountingOperations";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useAccountingOperations();

  async function submitForm() {
    const isValid = await form.value.validate();
    if (isValid) {
      await formStore.closeAccount();
      return true;
    }
    return false;
  }

  onMounted(() => {
    formStore.getCloseAccountModel();
  });

  defineExpose({
    submitForm,
  });
</script>
