<template>
  <q-icon
    class="icon-hover dark-3 cursor-pointer"
    size="sm"
    name="arrow_back"
    @click="$router.go(-1)"
  >
    <q-tooltip class="custom-tooltip">{{ $t("page.buttons.back") }}</q-tooltip>
  </q-icon>
</template>
<script setup></script>
