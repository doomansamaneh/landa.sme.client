<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-2 col-sm-4 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.no"
        :label="$t('shared.labels.no')"
        readonly
        disable
      />
    </div>
    <div class="col-md-3 col-sm-4 col-xs-12">
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
        :label="$t('shared.labels.contractTitle')"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.subject"
        type="textarea"
        :label="$t('shared.labels.comment')"
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
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";

  const props = defineProps({
    formStore: Object,
  });

  const localFormStore = computed(() => props.formStore);
</script>
