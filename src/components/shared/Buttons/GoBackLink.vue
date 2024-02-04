<template>
  <q-btn
    round
    unelevated
    dense
    class="text-on-dark"
    icon="arrow_back"
    @click="$router.back()"
  >
    <q-tooltip class="custom-tooltip">{{ $t("shared.labels.back") }}</q-tooltip>
  </q-btn>
</template>
<script setup></script>
