<template>
  <q-layout view="hHh Lpr lff" class="main-layout-color">
    <q-page-container>
      <home-page />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HomePage from "src/components/management/home/IndexView.vue"
</script>

<style>
.main-layout-color {
  background-color: #f5f6f9;
}
</style>
