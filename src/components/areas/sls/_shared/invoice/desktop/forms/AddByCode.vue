<template>
  <q-input
    class="q-pa-md"
    inputmode="search"
    input-class="text-body2 no-letter-spacing"
    outlined
    dense
    rounded
    v-model="productCode"
    :placeholder="$t('shared.labels.addItemByProductCode')"
    clearable
    clear-icon="o_clear"
    @keydown.enter="addByCode"
  >
    <template #append>
      <q-btn
        padding="0 12px"
        unelevated
        label="افزودن کالا"
        dense
        color="primary"
        rounded
        @click="addByCode"
      />
    </template>

    <template #prepend>
      <q-icon name="o_search" color="primary" />
    </template>
  </q-input>
</template>

<script setup>
  import { ref } from "vue";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

  const props = defineProps({
    formStore: useInvoiceModel,
  });

  const productCode = ref(null);
  const addByCode = () => {
    props.formStore.addNewRowByCode(productCode.value);
  };
</script>
