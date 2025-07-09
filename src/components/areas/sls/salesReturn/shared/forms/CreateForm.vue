<template>
  <!-- Desktop View -->
  <template v-if="$q.screen.gt.sm">
    <q-page-sticky class="z-top q-pa-md" position="bottom-right">
      <q-btn
        no-caps
        round
        color="primary"
        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        class="primary-gradient primary-shadow"
        @click="toggleFullscreen"
      />
    </q-page-sticky>

    <!-- Toolbar outside if not fullscreen -->
    <form-toolbar-container
      v-if="!fullscreen"
      buttons
      :title="title"
      @submit-call-back="submitForm"
    />

    <q-card
      :class="fullscreen ? 'fullscreen scroll fit' : 'form-container'"
      :square="fullscreen"
      :flat="fullscreen"
    >
      <!-- Toolbar inside if fullscreen -->
      <div
        v-if="fullscreen"
        class="bg-main z-1"
        style="position: sticky; top: 0"
      >
        <form-toolbar-container
          buttons
          :title="title"
          inside
          @submit-call-back="submitForm"
        />
      </div>
      <q-card-section
        :class="fullscreen ? 'q-px-lg q-pb-lg q-pt-none' : ''"
      >
        <q-form ref="form" autofocus>
          <desktop
            :form-store="formStore"
            :model="model"
            :form-type="invoiceFormType.salesReturn"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </template>

  <!-- Mobile View -->
  <template v-else>
    <form-toolbar-container
      buttons
      :title="title"
      @submit-call-back="submitForm"
    />
    <q-form ref="form" autofocus>
      <mobile
        :form-store="formStore"
        :model="model"
        :form-type="invoiceFormType.salesReturn"
      />
    </q-form>
  </template>
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
  const fullscreen = ref(true);

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };

  const submitForm = () => {
    formStore.submitForm(form.value, props.action);
  };

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
