<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-sm-12 col-xs-12">
          <inventory-lookup
            label="انبار کالا"
            v-model:selectedId="model.inventoryId"
            v-model:selectedText="model.inventoryTitle"
          />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <inventory-lookup
            label="انبار مقصد"
            v-model:selectedId="model.toInventoryId"
            v-model:selectedText="model.toInventoryTitle"
          />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <contract-lookup
            label="قرارداد"
            v-model:selectedId="model.contractId"
            v-model:selectedText="model.contractTitle"
          />
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <custom-input
            label="شرح"
            v-model="model.summary"
            hide-bottom-space
            type="textarea"
          />
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="row justify-end">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <date-time label="تاریخ" v-model="model.date" />
        </div>
      </div>
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
