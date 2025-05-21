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
    buttons
    :show-save-and-new="action === formAction.create"
    @submit-call-back="submitForm"
    @submit-and-new-call-back="submitAndNewForm"
  />

  <q-card
    :class="[
      'bg-main',
      fullscreen ? 'fullscreen scroll fit' : 'minimized-card',
    ]"
    square
    flat
  >
    <div
      v-if="fullscreen"
      class="bg-main z-1"
      style="position: sticky; top: 0"
    >
      <form-toolbar-container
        :title="title"
        buttons
        :show-save-and-new="action === formAction.create"
        inside
        @submit-call-back="submitForm"
        @submit-and-new-call-back="submitAndNewForm"
      />
    </div>
    <q-card-section
      :class="[
        fullscreen
          ? 'q-pt-none q-mt-negative q-px-lg q-pb-lg'
          : 'q-pa-none',
      ]"
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
  import { formAction, invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateFormV2.vue";
  import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
    model: invoiceModel,
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    saveCallBack: Function,
  });

  const route = useRoute();
  const form = ref(null);
  const fullscreen = ref(true);
  const $q = useQuasar();

  const isFullscreen = computed(() => fullscreen.value);
  const isDesktop = computed(() => $q.screen.gt.sm);
  const formComponent = computed(() =>
    isDesktop.value ? Desktop : Mobile
  );

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

  onMounted(() => {
    props.formStore.getById(route.params.id, props.method);
  });
</script>

<style scoped>
  .q-mt-negative {
    margin-top: -30px;
  }
</style>
