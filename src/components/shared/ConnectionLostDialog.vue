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
      <q-card-section class="q-mb-xl">
        <div class="text-h6 text-center full-width">
          <q-icon
            name="o_wifi_off"
            color="warning"
            size="2rem"
            class="q-mb-sm"
          />

          <div class="text-body1 text-weight-700">
            {{ $t("shared.messages.connectionLost") }}
          </div>
          <div class="text-body1 text-weight-700 caption-on-dark">
            {{ $t("shared.messages.checkConnection") }}
          </div>
        </div>

        <div class="flex items-center justify-center q-mt-md">
          <q-btn
            no-caps
            unelevated
            padding="4px 16px"
            color="primary"
            rounded
            @click="store.retryConnection"
          >
            {{ $t("shared.labels.retry") }}
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section
        :style="
          $q.dark.isActive
            ? 'border-top: 1px solid white'
            : 'border-top: 1px solid grey'
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
  import { useConnectionLost } from "src/composables/useConnectionLost";

  const store = useConnectionLost();
</script>
