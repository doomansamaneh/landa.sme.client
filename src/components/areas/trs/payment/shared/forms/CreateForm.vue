<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <desktop-form
          :form-store="formStore"
          :payment-receipt-type="paymentOrReceipt.payment"
        />
        <!-- <desktop-form v-if="$q.screen.gt.sm" :form-store="formStore" />
        <mobile-form v-else :form-store="formStore" /> -->
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { paymentOrReceipt } from "src/constants";
  import { useReceiptModel } from "../../../_composables/useReceiptModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import DesktopForm from "../../desktop/forms/CreateForm.vue";
  //import MobileForm from "../../mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const route = useRoute();
  const formStore = useReceiptModel({ baseRoute: "trs/payment" });
  const form = ref(null);

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
