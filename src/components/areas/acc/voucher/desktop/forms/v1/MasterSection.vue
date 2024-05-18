<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">شماره</q-item-label>
      <q-field dense readonly disable outlined filled>
        <template v-slot:control>
          <div class="self-center full-width no-outline">
            {{ localFormStore.model.value.no }}
          </div>
        </template>
      </q-field>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time v-model="localFormStore.model.value.date" />
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
        v-model="localFormStore.model.value.summary"
        hide-bottom-space
        type="textarea"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";

  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
  });

  const moreInfo = ref(false);

  const localFormStore = computed(() => props.formStore);
</script>
