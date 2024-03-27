<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <div class="form-container">
    <q-form ref="form" autofocus>
      <desktop v-if="$q.screen.gt.sm" :form-store="formStore" />
      <mobile v-else :form-store="formStore" />
      <!-- <mobile :form-store="formStore" /> -->
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import Desktop from "src/components/areas/sls/invoice/desktop/forms/CreateForm.vue";
import Mobile from "src/components/areas/sls/invoice/mobile/forms/CreateForm.vue";

const props = defineProps({
  title: String,
  action: String,
});

const formStore = useInvoiceModel();
const form = ref(null);
</script>
