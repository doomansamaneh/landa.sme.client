<template>
  <q-btn
    round
    unelevated
    dense
    class="text-on-dark"
    icon="arrow_back"
    @click="$router.go(-1)"
  >
    <q-tooltip class="custom-tooltip">{{ $t("page.buttons.back") }}</q-tooltip>
  </q-btn>
</template>
<script setup></script>
