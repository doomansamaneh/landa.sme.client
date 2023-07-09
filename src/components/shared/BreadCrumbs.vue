<template>
  <q-breadcrumbs active-color="primary" style="font-size: 12px" separator="-">
    <q-breadcrumbs-el
      v-for="item in items"
      :key="item.path"
      :label="item.name"
      :icon="item.meta.icon"
      :to="item.path"
    />
    <template #separator>
      <q-icon name="arrow_forward_ios" />
    </template>
  </q-breadcrumbs>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref, watch } from "vue"

const route = useRouter()

const items = ref([])

watch(() => {
  getRoute()
})

function getRoute() {
  items.value = route.currentRoute.value.matched
}
getRoute()
</script>

<style>
/* Customize the breadcrumbs styles as needed */
</style>
