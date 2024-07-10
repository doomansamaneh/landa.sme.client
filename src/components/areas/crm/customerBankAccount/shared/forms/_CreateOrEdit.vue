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
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        بانک
      </q-item-label>
      <bank-lookup
        v-model:selectedId="model.bankId"
        v-model:selectedText="model.bankTitle"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شماره حساب
      </q-item-label>
      <custom-input v-model="model.accountNo" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شماره کارت:
      </q-item-label>
      <custom-input v-model="model.cardNo" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شماره شبا:
      </q-item-label>
      <custom-input v-model="model.shaba" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شرح
      </q-item-label>
      <custom-input
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
