<template>
  <q-breadcrumbs active-color="primary" class="text-caption" separator="-">
    <q-breadcrumbs-el
      v-for="item in items"
      :key="item.path"
      :label="$t(item.name)"
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
import { useI18n } from "vue-i18n"

const route = useRouter()
const { t } = useI18n()

const items = ref([])

watch(() => {
  getRoute()
})

function getRoute() {
  items.value = route.currentRoute.value.matched.map((match) => {
    return {
      ...match,
      name: match.name ? `route-names.${match.name}` : ""
    }
  })
}
getRoute()
</script>
