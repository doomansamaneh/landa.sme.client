<template>
  <tool-bar :title="title" :submit-call-back="submitForm"> </tool-bar>
  <div class="form-container">
    <q-form ref="form" autofocus>
      <master-section :form-store="formStore" />
      <div class="q-mt-md">
        <detail-section :form-store="formStore" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import MasterSection from "src/components/areas/sls/invoice/desktop/forms/v1/MasterSection.vue";
import DetailSection from "src/components/areas/sls/invoice/mobile/forms/v1/DetailSectionTable.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const route = useRoute();
const formStore = useInvoiceModel();

onMounted(() => {
  formStore.getById(route.params.id);
});

function submitForm() {
  formStore.submitForm(form, props.action);
}
</script>
