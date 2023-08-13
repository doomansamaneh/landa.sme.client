<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container>
      <home-page />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomePage from "src/components/management/home/IndexView.vue"
</script>
