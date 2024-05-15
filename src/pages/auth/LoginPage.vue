<template>
  <q-page :class="pageStyle">
    <div class="main-container">
      <login-background v-if="$q.screen.gt.xs" />
      <q-card class="no-padding" :class="cardStyle">
        <q-card-section horizontal>
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

  const cardStyle = [
    $q.screen.gt.xs
      ? "bordered border-radius-xl"
      : "no-shadow no-border",
    $q.screen.gt.sm ? "login-card" : "",
  ];
</script>
