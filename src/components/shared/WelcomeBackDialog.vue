<template>
  <q-dialog
    v-model="visible"
    transition-show="scale"
    transition-hide="scale"
    no-backdrop-dismiss
  >
    <q-card
      style="width: 600px; max-width: 90vw"
      flat
      class="q-dialog-plugin"
    >
      <q-card-section
        class="q-px-sm q-pt-sm q-pb-none row items-center justify-end"
      >
        <q-btn unelevated @click="onDialogHide" round dense>
          <q-icon name="o_close" size="24px" />
        </q-btn>
      </q-card-section>
      <q-card-section class="text-center q-pa-xl">
        <div
          class="text-h6"
          style="white-space: pre-line; line-height: 1.6"
        >
          {{ $t("shared.labels.welcomeBackTitle") }}
        </div>
        <div class="q-mt-lg text-body1 caption-on-dark">
          {{
            $t("shared.labels.lastLoginInfo", {
              days: daysSinceLastLogin,
            })
          }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed, ref, watch } from "vue";
  import { useWelcomeBack } from "src/composables/useWelcomeBack";

  const {
    shouldShowWelcomeBack,
    markWelcomeBackAsShown,
    getDaysSinceLastLogin,
  } = useWelcomeBack();

  const visible = ref(shouldShowWelcomeBack.value);
  const daysSinceLastLogin = computed(() => getDaysSinceLastLogin());

  watch(shouldShowWelcomeBack, (newValue) => {
    visible.value = newValue;
  });

  function onDialogHide() {
    markWelcomeBackAsShown();
    visible.value = false;
  }
</script>

<style scoped>
  .q-dialog-plugin {
    border-radius: 16px;
  }

  .text-h4 {
    font-size: 3rem;
  }
</style>
