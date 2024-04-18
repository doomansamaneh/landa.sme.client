<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <desktop v-if="$q.screen.gt.sm" :form-store="formStore" />
        <mobile v-else :form-store="formStore" />
        <!-- <mobile :form-store="formStore" /> -->
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import Desktop from "src/components/areas/sls/invoice/desktop/forms/CreateForm.vue";
import Mobile from "src/components/areas/sls/invoice/mobile/forms/CreateForm.vue";

const props = defineProps({
  title: String,
  action: String,
  method: String,
});
const route = useRoute();
const formStore = useInvoiceModel({ baseRoute: "sls/quote" });
const form = ref(null);

onMounted(() => {
  formStore.getById(route.params.id, props.method);
});
</script>
