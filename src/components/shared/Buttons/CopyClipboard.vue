<template>
  <q-btn
    no-caps
    round
    unelevated
    dense
    size="sm"
    class="text-on-dark q-mx-xs"
    icon="content_copy"
    @click="copy"
  >
    <q-tooltip class="custom-tooltip">
      {{ $t("shared.labels.copy") }}
    </q-tooltip>
  </q-btn>
</template>
<script setup>
  import { useQuasar } from "quasar";
  import { copyToClipboard } from "quasar";

  const props = defineProps({
    text: String,
  });

  const $q = useQuasar();

  const copy = () => {
    copyToClipboard(props.text).then(() => {
      $q.notify({
        type: "info",
        message: "copied",
      });
    });
  };
</script>
