<template>
  <q-btn
    no-caps
    round
    unelevated
    dense
    class="text-on-dark"
    @click="$router.back()"
  >
    <q-icon
      size="20px"
      :name="
        icon ?? $q.screen.lt.sm ? mobileArrowIcon : desktopArrowIcon
      "
    />
    <q-tooltip class="custom-tooltip">
      {{ $t("shared.labels.back") }}
    </q-tooltip>
  </q-btn>
</template>
<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    icon: String,
  });

  const $q = useQuasar();

  const desktopArrowIcon = computed(() => {
    return $q.lang.rtl ? "arrow_back" : "arrow_forward";
  });

  const mobileArrowIcon = computed(() => {
    return $q.lang.rtl ? "arrow_forward" : "arrow_back";
  });
</script>
