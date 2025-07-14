<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <date-time
        v-model="localFormStore.model.value.date"
        :label="$t('shared.labels.date')"
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
        :label="$t('shared.labels.contract')"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.summary"
        type="textarea"
        :label="$t('shared.labels.subject')"
        required
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const localFormStore = computed(() => props.formStore);
</script>
