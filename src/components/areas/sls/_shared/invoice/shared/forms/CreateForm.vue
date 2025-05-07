<template>
  <q-page-sticky
    v-if="isDesktop"
    class="z-top q-pa-md"
    position="bottom-right"
  >
    <q-btn
      round
      color="primary"
      :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
      class="primary-gradient primary-shadow"
      @click="toggleFullscreen"
    />
  </q-page-sticky>

  <form-toolbar-container
    :title="title"
    :buttons="true"
    :show-save-and-new="action === formAction.create"
    @submit-call-back="submitForm"
    @submit-and-new-call-back="submitAndNewForm"
  />

  <q-card
    :class="fullscreen ? 'fullscreen scroll fit' : 'form-container'"
    :square="fullscreen"
    :flat="fullscreen"
  >
    <div
      v-if="fullscreen"
      class="bg-main z-1"
      style="position: sticky; top: 0"
    >
      <form-toolbar-container
        :title="title"
        :buttons="true"
        :show-save-and-new="action === formAction.create"
        inside
        @submit-call-back="submitForm"
        @submit-and-new-call-back="submitAndNewForm"
      />
    </div>

    <q-card-section
      :class="fullscreen ? 'q-px-lg q-pb-lg q-pt-none' : ''"
    >
      <q-form ref="form" autofocus>
        <component
          :is="formComponent"
          :form-store="formStore"
          :model="model"
          :form-type="formType"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useQuasar } from "quasar";
  import { invoiceFormType, formAction } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateForm.vue";
  import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
    formStore: useInvoiceModel,
    model: invoiceModel,
    formType: invoiceFormType,
    saveCallBack: Function,
  });

  const fullscreen = ref(false);
  const route = useRoute();
  const form = ref(null);

  const $q = useQuasar();

  const isFullscreen = computed(() => fullscreen.value);
  const isDesktop = computed(() => $q.screen.gt.sm);

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };

  const submitForm = () => {
    props.formStore.submitForm(
      form.value,
      props.action,
      props.saveCallBack
    );
  };

  const submitAndNewForm = () => {
    props.formStore.submitForm(
      form.value,
      props.action,
      props.formStore.getCreateModel
    );
  };

  const formComponent = computed(() =>
    isDesktop.value ? Desktop : Mobile
  );

  onMounted(() => {
    props.formStore.getById(route.params.id, props.method);
  });
</script>
