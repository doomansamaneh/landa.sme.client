<template>


  <div :style="marginTop()">
    <div class="row q-col-gutter-lg">

      <div class="col-md-2 col-sm-2 col-xs-12">
        <q-checkbox dense class="q-pb-md text-body1 no-letter-spacing" v-model="logo" label="لوگو در چاپ باشد" />
        <q-card class="row items-center justify-center bordered">
          <q-card-section class="row items-center justify-center">
            <q-avatar square size="80px">
              <img :src="logoSource" />
            </q-avatar>
            <input class="upload-box" type="file" id="logoUpload" @change="handleLogoUpload" accept="image/*">
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-2 col-sm-2 col-xs-12">
        <q-checkbox dense class="q-pb-md text-body1 no-letter-spacing" v-model="signature" label="امضا در چاپ باشد" />
        <q-card class="row items-center justify-center bordered">
          <q-card-section class="row items-center justify-center">
            <q-avatar square size="80px">
              <img :src="signatureSource" />
            </q-avatar>
            <input class="upload-box" type="file" id="signatureUpload" @change="handleSignatureUpload" accept="image/*">
          </q-card-section>
        </q-card>
      </div>

    </div>
  </div>


</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const logo = ref(true);
const signature = ref(true);

const logoSource = ref("/logo.jpg");
const signatureSource = ref("/signature.png");

const marginTop = () => {
  return [
    $q.screen.xs ? "margin-top:64px" : "",
    $q.screen.sm ? "margin-top:64px" : "",
    $q.screen.gt.sm ? "margin-top:56px" : "",
  ];
};

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
