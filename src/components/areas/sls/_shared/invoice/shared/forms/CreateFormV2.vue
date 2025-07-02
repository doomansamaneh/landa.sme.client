<template>
  <!-- Desktop View -->
  <template v-if="isDesktop">
    <q-page-sticky class="z-top q-pa-md" position="bottom-right">
      <q-btn
        no-caps
        round
        color="primary"
        :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        class="primary-gradient primary-shadow"
        @click="toggleFullscreen"
      />
    </q-page-sticky>

    <!-- Desktop, not fullscreen: Toolbar outside -->
    <form-toolbar-container
      v-if="!fullscreen"
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
      <!-- Desktop, fullscreen: Toolbar inside -->
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

  <!-- Mobile View -->
  <template v-else>
    <!-- Mobile: Simple layout with toolbar always outside -->
    <form-toolbar-container
      :title="title"
      buttons
      :show-save-and-new="action === formAction.create"
      @submit-call-back="submitForm"
      @submit-and-new-call-back="submitAndNewForm"
    />

    <q-form ref="mobileForm" autofocus>
      <component
        :is="formComponent"
        :form-store="formStore"
        :model="model"
        :form-type="formType"
      />
    </q-form>
  </template>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useQuasar } from "quasar";
  import { formAction, invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
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
  const mobileForm = ref(null);
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
    const formRef = isDesktop.value ? form.value : mobileForm.value;
    props.formStore.submitForm(
      formRef,
      props.action,
      props.saveCallBack
    );
  };

  const submitAndNewForm = () => {
    const formRef = isDesktop.value ? form.value : mobileForm.value;
    props.formStore.submitForm(
      formRef,
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
