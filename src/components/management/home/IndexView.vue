<template>
  <div class="col justify-center items-center">
    <q-btn @click="testStore.increamentLocal">increament local</q-btn>
    <q-btn @click="testStore.increamentGlobal">increament global</q-btn>
    <h4>{{ testStore.localCount }}</h4>
    <h4>{{ testStore.globalCount }}</h4>
    <h6>بزودی در اینجا داشبورد قرار خواهد گرفت</h6>
  </div>
</template>

<script setup>
import { useTest } from "src/components/areas/sls/_composables/testStore"
const testStore = useTest()
</script>

<style lang="scss"></style>
