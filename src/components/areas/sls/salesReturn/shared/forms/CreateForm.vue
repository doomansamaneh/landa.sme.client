<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <desktop
          v-if="$q.screen.gt.sm"
          :form-store="formStore"
          :model="model"
          :form-type="invoiceFormType.salesReturn"
        />
        <mobile
          v-else
          :form-store="formStore"
          :model="model"
          :form-type="invoiceFormType.salesReturn"
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
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";
  import { useSalesReturnState } from "../../../_composables/useSalesReturnState";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateForm.vue";
  import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });
  const route = useRoute();
  const model = ref(invoiceModel);
  const salesReturnStore = useSalesReturnState();
  const formStore = useInvoiceModel({
    baseRoute: "sls/salesReturn",
    createFromInvoice: true,
    resetCallback: salesReturnStore.reset,
    model: model,
  });
  const form = ref(null);

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
