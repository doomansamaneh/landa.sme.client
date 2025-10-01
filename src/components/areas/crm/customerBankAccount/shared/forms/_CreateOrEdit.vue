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
    <div class="col-12">
      <bank-lookup
        :label="$t('shared.labels.bankTitle')"
        v-model:selectedId="model.bankId"
        v-model:selectedText="model.bankTitle"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input
        :label="$t('shared.labels.accountNumber')"
        v-model="model.accountNo"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input
        :label="$t('shared.labels.cardNumber')"
        v-model="model.cardNo"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input
        :label="$t('shared.labels.ibanNumber')"
        v-model="model.shaba"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input
        :label="$t('shared.labels.comment')"
        v-model="model.comment"
        type="textarea"
        autogrow
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import BankLookup from "src/components/shared/lookups/BankLookup.vue";

  const props = defineProps({
    item: Object,
    typeId: Number,
  });

  const model = computed(() => props.item);
</script>
