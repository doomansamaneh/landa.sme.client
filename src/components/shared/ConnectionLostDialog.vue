<template>
  <q-dialog
    ref="dialogRef"
    no-backdrop-dismiss
    transition-duration="0"
    persistent
    maximized
    style="z-index: 9999 !important"
  >
    <q-card class="column items-center justify-center">
      <q-card-section class="q-mb-xl q-pb-xl">
        <div class="text-h6 text-center full-width">
          <q-icon
            name="o_wifi_off"
            color="warning"
            size="2rem"
            class="q-mb-sm"
          />

          <div class="text-body1 caption-on-dark q-mb-xs">
            {{ $t("messages.connectionLost") }}
          </div>
          <div class="text-body text-weight-700 caption-on-dark">
            {{ $t("messages.checkConnection") }}
          </div>
        </div>

        <div class="flex items-center justify-center q-mt-md">
          <q-btn
            no-caps
            unelevated
            padding="4px 16px"
            color="primary"
            rounded
            :disable="isLoading"
            @click="retryConnection"
          >
            <span v-if="isLoading">
              {{ $t("messages.checkingConnection") }}
            </span>
            <span v-else>
              {{ $t("shared.labels.retry") }}
            </span>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section
        :style="
          $q.dark.isActive
            ? 'border-top: 1px solid white'
            : 'border-top: 1px solid #2d2d2d2d'
        "
        class="fixed-bottom flex flex-center q-pa-lg bg-dark"
      >
        <img
          :style="{
            width: $q.screen.lt.md ? '180px' : '250px',
            filter: $q.dark.isActive ? 'brightness(0) invert(1)' : '',
          }"
          src="/about-us-header.png"
          alt=""
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import {
    fetchWrapper,
    isConnectionDialogOpen,
  } from "src/helpers/fetch-wrapper";
  import { useQuasar } from "quasar";
  import { useComposables } from "src/stores/useComposables";
  import { bus } from "src/helpers";

  const $q = useQuasar();
  const isLoading = ref(false);
  const dialogRef = ref(null);
  const composablesStore = useComposables();

  const reloadData = () => {
    composablesStore.reset();
    bus.emit("render-page");
  };

  const retryConnection = async () => {
    try {
      isLoading.value = true;
      const success = await fetchWrapper.retryConnection();

      if (success) {
        reloadData();
        isConnectionDialogOpen.value = false;
        dialogRef.value.hide();
      }
    } catch (error) {
      // Connection still failed, keep dialog open
    } finally {
      isLoading.value = false;
    }
  };
</script>
