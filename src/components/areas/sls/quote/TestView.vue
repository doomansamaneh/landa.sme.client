<template>
  <h4>دریافت منوها</h4>
  <q-btn @click="getMenuItems" color="blue">دریافت همه منوها</q-btn>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { fetchWrapper } from "src/helpers"

async function getMenuItems() {
  await fetchWrapper
    .get("scr/users/getMenuItems")
    .then((response) => {
      alert("menu items fetched")
      console.log(response.data)
    })
    .finally(() => {})
}
</script>
