<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <desktop
          v-if="$q.screen.gt.sm"
          :form-store="formStore"
          :form-type="invoiceFormType.sales"
        />
        <mobile
          v-else
          :form-store="formStore"
          :form-type="invoiceFormType.sales"
        />
        <!-- <mobile :form-store="formStore" /> -->
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

  import ToolBar from "src/components/shared/FormToolBar.vue";
  import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateFormV2.vue";
  import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });
  const route = useRoute();
  const formStore = useInvoiceModel({ baseRoute: "sls/invoice" });
  const form = ref(null);

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
