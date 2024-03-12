<template>
  <q-card>
    <q-card-section class="q-gutter-y-sm">
      <invoice-header :model="formStore.model" />
      <invoice-body :model="formStore.model" :form-store="formStore" />
      <invoice-footer :model="formStore.model" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";

import InvoiceHeader from "./_HeaderSection.vue";
import InvoiceBody from "./_BodySection.vue";
import InvoiceFooter from "./_FooterSection.vue";

const props = defineProps({
  item: Object,
});
const formStore = useInvoiceModel();
const route = useRoute();

onMounted(() => {
  const id = props.item?.id ?? route.params.id;
  formStore.crudStore.getById(id);
});
</script>
