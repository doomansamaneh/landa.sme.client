<template>
  <q-breadcrumbs active-color="primary" style="font-size: 12px" separator="-">
    <q-breadcrumbs-el label="business" to="/business" icon="business" />
    <q-breadcrumbs-el label="business" to="/business" icon="business" />
  </q-breadcrumbs>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()

const list = router.currentRoute.value
</script>

<style>
/* Customize the breadcrumbs styles as needed */
</style>
