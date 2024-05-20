<template>
  <q-form ref="form" autofocus>
    <div class="row q-mb-md">
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          تاریخ
        </q-item-label>
        <date-time v-model="formStore.model.value.date" />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          حساب مقصد
        </q-item-label>
        <sl-lookup
          v-model:selectedId="formStore.model.value.destinationSLId"
          v-model:selectedText="
            formStore.model.value.destinationSLTitle
          "
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          شرح
        </q-item-label>
        <custom-input v-model="formStore.model.value.subject" />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          نوع حساب
        </q-item-label>
        <q-option-group
          inline
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
    try {
      const isValid = await form.value.validate();

      if (isValid) {
        await formStore.closeAccount();
        return true;
      } else {
        alert("Validation error");
        return false;
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      return false;
    }
  }

  onMounted(() => {
    formStore.getCloseAccountModel();
  });

  defineExpose({
    submitForm,
  });
</script>
