<template>
  <tool-bar buttons :title="title" back-button>
    <template #buttons>
      <q-btn :to="`/crm/customer/edit/${id}`" class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px" rounded unelevated no-caps>
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
    </template>
  </tool-bar>

  <div :style="marginTop()">

    <div class="row items-center q-col-gutter-lg">

      <div class="col-md-2 col-sm-2 col-xs-6">
        <q-checkbox dense class="q-pb-md text-body1 no-letter-spacing" v-model="logo" label="لوگو در چاپ باشد" />
        <q-card class="bordered fit">
          <q-card-section class="row items-center justify-center">
            <q-avatar style="width: 100%;" size="xl" square>
              <img class="overly" :src="logoSource">
            </q-avatar>
            <input class="upload-box" type="file" id="logoUpload" @change="handleLogoUpload" accept="image/*">
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-2 col-sm-2 col-xs-6">
        <q-checkbox dense class="q-pb-md text-body1 no-letter-spacing" v-model="signature" label="امضا در چاپ باشد" />
        <q-card class="bordered fit">
          <q-card-section class="row items-center justify-center">
            <q-avatar style="width: 100%;" size="xl" square>
              <img :src="signatureSource">
            </q-avatar>
            <input class="upload-box" type="file" id="signatureUpload" @change="handleSignatureUpload" accept="image/*">
          </q-card-section>
        </q-card>
      </div>

    </div>

  </div>

  <tabs />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { invoiceModel } from "src/models/areas/sls/invoiceModel";

import ToolBar from "src/components/shared/ToolBarDesktop.vue";
import Tabs from "src/components/areas/cmn/appConfig/companySetting/_PreviewTabs.vue";

const $q = useQuasar();

const props = defineProps({
  item: Object,
  title: String,
});

const logo = ref(true);
const signature = ref(true);

const logoSource = ref("/logo.jpg");
const signatureSource = ref("/signature.png");

const route = useRoute();
const model = ref(invoiceModel);
const formStore = useFormActions("crm/customer", model);

const id = computed(() => props.item?.id ?? route.params.id);

const marginTop = () => {
  return [
    $q.screen.xs ? "margin-top:64px" : "",
    $q.screen.sm ? "margin-top:64px" : "",
    $q.screen.gt.sm ? "margin-top:56px" : "",
  ];
};

onMounted(() => {
  formStore.getById(id.value);
});

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  logoSource.value = URL.createObjectURL(file); 
  alert("File selected: " + file.name);
};

const handleSignatureUpload = (event) => {
  const file = event.target.files[0];
  signatureSource.value = URL.createObjectURL(file); 
  alert("File selected: " + file.name);
};
</script>

<style lang="scss">
.profile-section {
  width: 400px;
}

.info-box:hover {
  border: 1px solid var(--q-primary) !important;
  cursor: pointer;
}

.upload-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}
</style>
