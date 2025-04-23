<template>
  <q-page-sticky
    v-if="$q.screen.gt.sm"
    class="z-top q-pa-md"
    position="bottom-right"
  >
    <q-btn
      round
      color="primary"
      icon="fullscreen"
      class="primary-gradient primary-shadow"
      v-if="!isFullscreen"
      @click="toggleFullscreen"
    />
    <q-btn
      round
      color="primary"
      icon="fullscreen_exit"
      class="primary-gradient primary-shadow"
      v-else
      @click="toggleFullscreen"
    />
  </q-page-sticky>

  <template v-if="fullscreen">
    <q-card square flat class="fullscreen scroll fit">
      <div class="bg-main z-1" style="position: sticky; top: 0">
        <form-toolbar-container
          buttons
          inside
          :title="title"
          @submit-call-back="
            formStore.submitForm(form, action, saveCallBack)
          "
        />
      </div>

      <q-card-section class="q-px-lg q-pb-lg q-pt-none">
        <q-form ref="form" autofocus>
          <desktop
            v-if="$q.screen.gt.sm"
            :form-store="formStore"
            :model="model"
            :form-type="formType"
          />
          <mobile
            v-else
            :form-store="formStore"
            :model="model"
            :form-type="formType"
          />
          <!-- <mobile :form-store="formStore" /> -->
        </q-form>
      </q-card-section>
    </q-card>
  </template>

  <template v-else>
    <form-toolbar-container
      buttons
      :title="title"
      @submit-call-back="
        formStore.submitForm(form, action, saveCallBack)
      "
    />

    <q-card class="form-container">
      <q-card-section>
        <q-form ref="form" autofocus>
          <desktop
            v-if="$q.screen.gt.sm"
            :form-store="formStore"
            :model="model"
            :form-type="formType"
          />
          <mobile
            v-else
            :form-store="formStore"
            :model="model"
            :form-type="formType"
          />
          <!-- <mobile :form-store="formStore" /> -->
        </q-form>
      </q-card-section>
    </q-card>
  </template>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { invoiceFormType } from "src/constants";
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

  const isFullscreen = computed(() => fullscreen.value);

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };

  onMounted(() => {
    props.formStore.getById(route.params.id, props.method);
  });
</script>
