<template>
  <q-page :class="pageStyle">
    <div class="main-container">
      <login-background v-if="$q.screen.gt.xs" />
      <q-card class="no-padding_ form-container">
        <q-card-section horizontal style="padding: 0 !important">
          <master-section />
          <detail-section />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import { useQuasar } from "quasar";

  import LoginBackground from "src/assets/LoginBackground.vue";
  import MasterSection from "src/components/auth/MasterSection.vue";
  import DetailSection from "src/components/auth/DetailSection.vue";

  const $q = useQuasar();

  const pageStyle = $q.screen.gt.xs
    ? "flex full-screen items-center justify-center"
    : "q-pt-lg";
</script>
