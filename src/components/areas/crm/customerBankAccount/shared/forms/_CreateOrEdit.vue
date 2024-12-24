<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-checkbox
        size="46px"
        dense
        v-model="model.isPrimary"
        val="customer"
        label="اصلی"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <bank-lookup
        label="بانک"
        v-model:selectedId="model.bankId"
        v-model:selectedText="model.bankTitle"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input label="شماره حساب" v-model="model.accountNo" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input label="شماره کارت" v-model="model.cardNo" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input label="شماره شبا" v-model="model.shaba" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <custom-input
        label="شرح"
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
