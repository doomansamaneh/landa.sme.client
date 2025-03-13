<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <date-time
        v-model="localFormStore.model.value.date"
        label="تاریخ"
        required
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        بابت
      </q-item-label>
      <q-option-group
        inline
        :options="
          helper.getEnumOptions(paymentFormType, 'paymentFormType')
        "
        type="radio"
        v-model="formType"
        @update:model-value="formTypeChanged"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <customer-lookup
        v-model:selectedId="localFormStore.model.value.customerId"
        v-model:selectedText="localFormStore.model.value.customerName"
        label="مخاطب"
        dl-balance
      />
    </div>
  </div>

  <div v-if="formType === paymentFormType.other" class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <sl-lookup
        v-model:selectedId="localFormStore.model.value.slId"
        v-model:selectedText="localFormStore.model.value.slTitle"
        label="حساب معین"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <contract-lookup
        v-model:selectedId="localFormStore.model.value.contractId"
        v-model:selectedText="
          localFormStore.model.value.contractTitle
        "
        label="قرارداد"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.summary"
        type="textarea"
        label="شرح"
      />
    </div>
  </div>

  <remained-grid
    v-if="formType === paymentFormType.purhcase"
    class="q-mt-md"
    ref="invoiceGrid"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { paymentFormType } from "src/constants";
  import { useReceiptModel } from "src/components/areas/trs/_composables/useReceiptModel";

  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import RemainedGrid from "./RemainedGrid.vue";

  const props = defineProps({
    formStore: useReceiptModel,
  });

  const formType = ref(paymentFormType.purhcase);
  const invoiceGrid = ref(null);
  const localFormStore = computed(() => props.formStore);

  const formTypeChanged = async (e) => {
    if (e === paymentFormType.purhcase)
      localFormStore.value.resetSL();
    else localFormStore.value.resetRemainedInvoices();
  };
</script>
