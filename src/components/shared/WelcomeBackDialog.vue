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
      class="q-dialog-plugin welcome-back-card"
    >
      <q-card-section
        class="q-px-sm q-pt-sm q-pb-none row items-center justify-end"
      >
        <q-btn unelevated @click="onDialogHide" round dense>
          <q-icon name="o_close" size="24px" />
        </q-btn>
      </q-card-section>
      <q-card-section class="text-center q-px-xl q-pt-xl q-pb-none">
        <div class="text-h1">🌻</div>
        <div
          class="text-h6"
          style="white-space: pre-line; line-height: 1.6"
        >
          {{ $t("shared.labels.welcomeBackTitle") }}
        </div>
        <div class="q-mt-lg text-body2 caption-on-dark">
          {{
            $t("shared.labels.lastLoginInfo", {
              days: daysSinceLastLogin,
            })
          }}
        </div>

        <q-separator spaced />
        <div v-if="lastIp" class="text-body2 caption-on-dark">
          {{ $t("shared.labels.lastIpInfo") }} {{ lastIp }}
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pa-lg">
        <q-btn
          padding="8px 12px"
          rounded
          dense
          unelevated
          :label="$t('shared.labels.ok')"
          class="primary-gradient primary-shadow text-white"
          @click="onDialogHide"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useWelcomeBack } from "src/composables/useWelcomeBack";
  import { useAuthStore } from "src/stores";

  const { shouldShowWelcomeBack, getDaysSinceLastLogin } =
    useWelcomeBack();

  const authStore = useAuthStore();
  const visible = ref(shouldShowWelcomeBack.value);
  const daysSinceLastLogin = computed(() => getDaysSinceLastLogin());

  const lastIp = computed(() => {
    const user = authStore.currentUser;
    return user?.lastLoginIp || null;
  });

  function onDialogHide() {
    authStore.updateLastLoginDate(new Date().toISOString());
    visible.value = false;
  }
</script>
