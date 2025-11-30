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
    <div class="image-preview-container">
      <img
        v-if="logoSource"
        :src="logoSource"
        class="preview-image"
        alt="logo"
      />
      <input
        class="upload-box"
        type="file"
        id="logoUpload"
        @change="handleLogoUpload"
        accept="image/*"
      />
    </div>
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
    <div class="image-preview-container">
      <img
        v-if="signatureSource"
        :src="signatureSource"
        class="preview-image"
        alt="signature"
      />
      <input
        class="upload-box"
        type="file"
        id="signatureUpload"
        @change="handleSignatureUpload"
        accept="image/*"
      />
    </div>
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
    try {
      if (!configStore.model.value?.companySetting?.id) {
        await configStore.reloadData?.();
      }

      configStore.resetAvatars();
      logoSource.value = await configStore.getAvatar(
        mediaType.avatar,
        300,
        200
      );
      signatureSource.value = await configStore.getAvatar(
        mediaType.signature,
        300,
        200
      );
    } catch (error) {
      console.error("Error loading logo/signature:", error);
    }
  });
</script>

<style lang="scss">
  .image-preview-container {
    position: relative;
    width: 120px;
    height: 80px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .preview-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    image-rendering: auto;
    -ms-interpolation-mode: bicubic;
    transform: translateZ(0);
    will-change: transform;
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

  .settings-card {
    width: 900px;
  }
</style>
