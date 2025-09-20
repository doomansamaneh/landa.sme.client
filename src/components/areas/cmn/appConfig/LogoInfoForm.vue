<template>
  <q-card-section class="no-padding">
    <q-checkbox
      dense
      size="46px"
      class="q-mb-md text-body1"
      :label="t('shared.labels.logoInPrint')"
      v-model="configStore.model.value.companySetting.invoiceShowLogo"
    />
  </q-card-section>
  <q-card-section class="no-padding">
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

  <q-card-section class="no-padding">
    <q-checkbox
      dense
      size="46px"
      class="q-mb-md text-body1"
      :label="t('shared.labels.signatureInPrint')"
      v-model="
        configStore.model.value.companySetting.invoiceShowSignature
      "
    />
  </q-card-section>
  <q-card-section class="no-padding">
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
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";
  import { mediaType } from "src/constants";
  import { useI18n } from "vue-i18n";

  const logoSource = ref("");
  const signatureSource = ref("");
  const configStore = useAppConfigModel();
  const { t } = useI18n();

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    logoSource.value = URL.createObjectURL(file);
    configStore.uploadLogo(file);
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    signatureSource.value = URL.createObjectURL(file);
    configStore.uploadSignature(file);
  };

  onMounted(async () => {
    configStore.resetAvatars();
    logoSource.value = await configStore.getAvatar(mediaType.avatar);
    signatureSource.value = await configStore.getAvatar(
      mediaType.signature
    );
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
