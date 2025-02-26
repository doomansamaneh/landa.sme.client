<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <date-time
        label="تاریخ"
        v-model="localFormStore.model.value.date"
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
          helper.getEnumOptions(receiptFormType, 'receiptFormType')
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

  <div v-if="formType === receiptFormType.other" class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <sl-lookup
        label="حساب معین"
        v-model:selectedId="localFormStore.model.value.slId"
        v-model:selectedText="localFormStore.model.value.slTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <contract-lookup
        label="قرارداد"
        v-model:selectedId="localFormStore.model.value.contractId"
        v-model:selectedText="
          localFormStore.model.value.contractTitle
        "
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        label="شرح"
        v-model="localFormStore.model.value.summary"
        hide-bottom-space
        type="textarea"
      />
    </div>
  </div>

  <remained-grid
    v-if="formType === receiptFormType.sales"
    class="q-mt-md"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { receiptFormType } from "src/constants";
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

  const formType = ref(receiptFormType.sales);
  const localFormStore = computed(() => props.formStore);

  const formTypeChanged = async (e) => {
    if (e === paymentFormType.purhcase)
      localFormStore.value.resetSL();
    else localFormStore.value.resetRemainedInvoices();
  };
</script>
