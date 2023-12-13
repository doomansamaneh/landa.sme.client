<template>
  <div v-if="showBanner">
    <q-banner
      inline-actions
      class="z-max bg-warning"
    >
      <div class="row items-center text-black">
        <q-icon
          name="public"
          size="22px"
          class="q-icon-banner q-mr-xs"
          color="black"
        />
        <strong class="q-pr-lg">{{ status }}</strong>
        <span>
          {{ $t(message) }}
        </span>
      </div>
      <template v-slot:action>
        <q-btn
          @click="hideBanner"
          flat
          dense
          unelevated
          icon="close"
          color="black"
          size="sm"
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

