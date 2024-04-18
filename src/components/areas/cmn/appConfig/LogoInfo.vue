<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
  >
    <q-card-section>
      <q-checkbox
        class="text-body1 no-letter-spacing"
        label="لوگو در چاپ باشد"
        v-model="configStore.model.value.companySetting.invoiceShowLogo"
      />
    </q-card-section>
    <q-card-section>
      <q-avatar square>
        <img :src="logoSource" />
      </q-avatar>
      <input
        class="upload-box"
        type="file"
        id="logoUpload"
        @change="handleLogoUpload"
        accept="image/*"
      />
    </q-card-section>

    <q-separator class="q-my-md" />

    <q-card-section>
      <q-checkbox
        class="text-body1 no-letter-spacing"
        label="امضا در چاپ باشد"
        v-model="configStore.model.value.companySetting.invoiceShowSignature"
      />
    </q-card-section>
    <q-card-section>
      <q-avatar square>
        <img :src="signatureSource" />
      </q-avatar>
      <input
        class="upload-box"
        type="file"
        id="signatureUpload"
        @change="handleSignatureUpload"
        accept="image/*"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useAppConfigModel } from "../_composables/useAppConfigModel";

const $q = useQuasar();
const configStore = useAppConfigModel();
const logoSource = ref("");

const signatureSource = ref("");

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  logoSource.value = URL.createObjectURL(file);
  configStore.uploadFile(file, "logoId");
};

const handleSignatureUpload = (event) => {
  const file = event.target.files[0];
  signatureSource.value = URL.createObjectURL(file);
  configStore.uploadFile(file, "signatureId");
};

onMounted(() => {
  if (configStore.model.value.companySetting?.businessLogo?.path)
    logoSource.value = configStore.model.value.companySetting.businessLogo.path;
  if (configStore.model.value.companySetting?.businessSignature?.path)
    signatureSource.value =
      configStore.model.value.companySetting.businessSignature.path;
});
</script>

<style lang="scss">
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

.settings-card {
  width: 900px;
}
</style>
