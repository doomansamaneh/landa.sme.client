<template>
  <q-page
    :class="
      $q.screen.gt.sm
        ? 'row items-center justify-center overflow-hidden'
        : ''
    "
  >
    <div :class="$q.screen.gt.xs ? 'main-container' : ''">
      <background v-if="$q.screen.gt.xs" />
      <index-view />
    </div>

    <!-- Show CongratsDialog if firstLogin is true -->
    <!-- <congrats-dialog v-if="showCongratsDialog" /> -->
  </q-page>
</template>

<script setup>
  // import { computed } from "vue";
  import { useFirstLogin } from "src/composables/useFirstLogin";
  import Background from "src/assets/BusinessBackground.vue";
  import IndexView from "src/components/management/business/FirstLoginWizard.vue";
  // import CongratsDialog from "src/components/shared/CongratsDialog.vue";

  const tutorialStore = useFirstLogin();
  // const showCongratsDialog = computed(
  //   () => tutorialStore.firstLogin.value
  // );
</script>
