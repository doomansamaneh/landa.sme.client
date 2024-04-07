<template>
  <q-btn
    round
    unelevated
    dense
    class="text-on-dark"
    :icon="arrowIcon()"
    @click="$router.back()"
  >
    <q-tooltip class="custom-tooltip">{{ $t("shared.labels.back") }}</q-tooltip>
  </q-btn>
</template>
<script setup>
import { useQuasar } from "quasar"

const $q = useQuasar()

const arrowIcon = () => {
  return $q.lang.rtl ? 'arrow_back' : 'arrow_forward'
}

</script>
