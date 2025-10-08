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
      class="q-dialog-plugin anniversary-card"
    >
      <q-card-section
        class="q-px-sm q-pt-sm q-pb-none row items-center justify-end"
      >
        <q-btn unelevated @click="onDialogHide" round dense>
          <q-icon name="o_close" size="24px" />
        </q-btn>
      </q-card-section>
      <q-card-section class="text-center q-px-xl q-pt-xl q-pb-none">
        <div class="text-h1">🎉</div>
        <div
          class="text-h6"
          style="white-space: pre-line; line-height: 1.6"
        >
          {{ $t("shared.labels.anniversaryTitle") }}
        </div>
        <div class="q-mt-lg text-body2 caption-on-dark">
          {{
            $t("shared.labels.anniversaryInfo", {
              years: yearsSinceCreation,
            })
          }}
        </div>

        <q-separator spaced />
        <div class="text-body2 caption-on-dark">
          {{ $t("shared.labels.anniversarySubtitle") }}
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
  import { useAnniversary } from "src/composables/useAnniversary";
  import { useAuthStore } from "src/stores";

  const { shouldShowAnniversary, getYearsSinceCreation } =
    useAnniversary();

  const authStore = useAuthStore();
  const visible = ref(shouldShowAnniversary.value);
  const yearsSinceCreation = computed(() => getYearsSinceCreation());

  function onDialogHide() {
    authStore.updateAnniversaryShown(new Date().toISOString());
    visible.value = false;
  }
</script>
