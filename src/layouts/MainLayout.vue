<template>
  <q-layout>
    <home-page />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomePage from "src/components/management/home/IndexView.vue"
</script>
