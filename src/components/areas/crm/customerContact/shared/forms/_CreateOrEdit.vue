<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-checkbox
        size="46px"
        dense
        v-model="model.isPrimary"
        val="customer"
        :label="$t('shared.labels.isPrimary')"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <contact-type-lookup
        :label="$t('shared.columns.typeId')"
        v-model:selectedId="model.contactTypeId"
        v-model:selectedText="model.contactTypeTitle"
        :filter-expression="contactTypeFilter"
      />
    </div>
    <div class="col-md col-sm col-xs-12">
      <custom-input
        :label="$t('shared.columns.amount')"
        v-model="model.value"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <custom-input
        :label="$t('shared.columns.comment')"
        v-model="model.comment"
        type="textarea"
        autogrow
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { sqlOperator } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import ContactTypeLookup from "src/components/shared/lookups/ContactTypeLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    item: Object,
    typeId: Number,
  });

  const model = computed(() => props.item);
  const contactTypeFilter = [
    {
      fieldName: "TypeId",
      operator: sqlOperator.equal,
      value: props.typeId,
    },
  ];
</script>
