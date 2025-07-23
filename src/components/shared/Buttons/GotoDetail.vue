<template>
  <q-btn
    no-caps
    round
    unelevated
    dense
    class="text-on-dark"
    :icon="arrowIcon()"
    :to="url"
  >
    <q-tooltip class="custom-tooltip">
      {{ $t("shared.labels.showDetail") }}
    </q-tooltip>
  </q-btn>
</template>
<script setup>
  import { useQuasar } from "quasar";
  const props = defineProps({ url: String });

  const $q = useQuasar();

  const arrowIcon = () => {
    return $q.lang.rtl
      ? "keyboard_arrow_left"
      : "keyboard_arrow_right";
  };
</script>
