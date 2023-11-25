<template>
  <div v-if="showBanner">
    <q-banner
      inline-actions
      class="z-max error-banner"
    >
      <div class="row items-center text-dark">
        <q-icon
          name="public"
          size="22px"
          class="q-icon-banner q-mr-xs"
        />
        <strong class="q-pr-lg">{{ status }}</strong>
        <span>
          {{ $t(message) }}
        </span>
      </div>
      <template v-slot:action>
        <q-icon
          @click="hideBanner"
          flat
          unelevated
          name="close"
          class="q-icon-banner cursor-pointer"
        />
      </template>
    </q-banner>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useAlertStore } from "stores"

const alertStore = useAlertStore()

const showBanner = computed(() => alertStore.showAlert())
const status = computed(() =>
  alertStore.alert != null ? alertStore.alert.status : 0
)
const message = computed(() =>
  alertStore.alert != null ? alertStore.alert.message : ""
)

function hideBanner() {
  alertStore.hide()
}
</script>

<style>
.error-banner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  margin-top: 25px;
}
</style>
