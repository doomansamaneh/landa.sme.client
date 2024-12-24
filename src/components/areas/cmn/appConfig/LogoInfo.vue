<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section :class="padding()">
      <q-checkbox
        class="text-body1 no-letter-spacing"
        label="لوگو در چاپ باشد"
        v-model="
          configStore.model.value.companySetting.invoiceShowLogo
        "
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
        dense
        size="46px"
        class="text-body1 no-letter-spacing"
        label="امضا در چاپ باشد"
        v-model="
          configStore.model.value.companySetting.invoiceShowSignature
        "
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

    <q-card-actions class="q-pb-lg q-px-lg q-mx-sm" align="right">
      <save-button />
    </q-card-actions>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";
  import { mediaType } from "src/constants";

  import SaveButton from "./_SaveSettingButton.vue";

  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();
  const logoSource = ref("");
  const signatureSource = ref("");
  const configStore = useAppConfigModel();

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

  const styles = () => {
    if (!props.inside && $q.screen.gt.sm) {
      return "q-card form-container settings-card";
    } else if (!props.inside) {
      return "q-card form-container";
    } else {
      return "";
    }
  };

  const padding = () => {
    if (props.inside) {
      return "no-padding";
    }
  };
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
