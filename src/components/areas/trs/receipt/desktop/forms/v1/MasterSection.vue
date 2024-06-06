<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time v-model="localFormStore.model.value.date" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مخاطب</q-item-label>
      <customer-lookup
        v-model:selectedId="localFormStore.model.value.customerId"
        v-model:selectedText="localFormStore.model.value.customerName"
        @row-selected="customerChanged"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
      <contract-lookup
        v-model:selectedId="localFormStore.model.value.contractId"
        v-model:selectedText="
          localFormStore.model.value.contractTitle
        "
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input
        v-model="localFormStore.model.value.subject"
        hide-bottom-space
        type="textarea"
      />
    </div>
  </div>

  <remained-grid
    class="q-mt-md"
    ref="invoiceGrid"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, computed } from "vue";

  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import RemainedGrid from "./RemainedGrid.vue";

  const props = defineProps({
    formStore: Object,
  });

  const invoiceGrid = ref(null);
  const localFormStore = computed(() => props.formStore);

  function customerChanged(row) {
    //invoiceGrid.value.reloadData(row?.id);
  }
</script>
