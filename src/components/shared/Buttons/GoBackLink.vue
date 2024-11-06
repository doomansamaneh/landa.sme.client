<template>
  <q-btn
    round
    unelevated
    dense
    class="text-on-dark"
    @click="$router.back()"
  >
    <q-icon size="20px" :name="arrowIcon()" />
    <q-tooltip class="custom-tooltip">
      {{ $t("shared.labels.back") }}
    </q-tooltip>
  </q-btn>
</template>
<script setup>
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  const arrowIcon = () => {
    return $q.lang.rtl ? "arrow_forward" : "arrow_back";
  };
</script>
