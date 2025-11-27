<template>
  <q-page :class="pageStyle">
    <div class="main-container">
      <login-background v-if="$q.screen.gt.xs" />
      <q-card
        class="login-card"
        :bordered="$q.screen.gt.xs"
        :flat="$q.screen.xs"
      >
        <q-card-section horizontal style="padding: 0 !important">
          <master-section />
          <detail-section v-if="$q.screen.gt.xs" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useAuthStore } from "src/stores";

  import LoginBackground from "src/assets/LoginBackground.vue";
  import MasterSection from "src/components/auth/MasterSection.vue";
  import DetailSection from "src/components/auth/DetailSection.vue";

  const $q = useQuasar();
  const authStore = useAuthStore();

  const pageStyle = $q.screen.gt.xs
    ? "flex full-screen items-center justify-center"
    : "q-pt-lg";

  onMounted(async () => {
    $q.dark.set(false);
    authStore.logout();
  });
</script>
