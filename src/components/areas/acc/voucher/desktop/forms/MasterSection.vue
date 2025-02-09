<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.no"
        label="شماره"
        readonly
        disable
      />
    </div>
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
        v-model="localFormStore.model.value.subject"
        type="textarea"
        label="شرح"
        required
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
  });

  const localFormStore = computed(() => props.formStore);
</script>
