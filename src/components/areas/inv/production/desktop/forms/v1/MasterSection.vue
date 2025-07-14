<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-sm-12 col-xs-12">
          <inventory-lookup
            v-model:selectedId="model.inventoryId"
            v-model:selectedText="model.inventoryTitle"
            :label="$t('shared.columns.inventoryTitle')"
            required
          />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <inventory-lookup
            v-model:selectedId="model.toInventoryId"
            v-model:selectedText="model.toInventoryTitle"
            :label="$t('shared.columns.toInventoryTitle')"
            required
          />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
          <contract-lookup
            v-model:selectedId="model.contractId"
            v-model:selectedText="model.contractTitle"
            :label="$t('shared.labels.contract')"
          />
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <custom-input
            v-model="model.summary"
            type="textarea"
            :label="$t('shared.columns.summary')"
            required
          />
        </div>
      </div>
    </div>

    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="row justify-end">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <date-time
            v-model="model.date"
            :label="$t('shared.columns.date')"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);
</script>
