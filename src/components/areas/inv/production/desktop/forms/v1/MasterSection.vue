<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time v-model="model.date" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">انبار کالا</q-item-label>
      <inventory-lookup
        v-model:selectedId="model.inventoryId"
        v-model:selectedText="model.inventoryTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">انبار مقصد</q-item-label>
      <inventory-lookup
        v-model:selectedId="model.toInventoryId"
        v-model:selectedText="model.toInventoryTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">قرارداد</q-item-label>
      <contract-lookup
        v-model:selectedId="model.contractId"
        v-model:selectedText="model.contractTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input
        v-model="model.summary"
        hide-bottom-space
        type="textarea"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);
</script>
