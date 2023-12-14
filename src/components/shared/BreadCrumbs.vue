<template>
  <q-breadcrumbs
    v-if="show"
    active-color="primary"
    class="text-body2 q-px-lg z-max"
  >
    <q-breadcrumbs-el
      v-for="item in validItems"
      :key="item.path"
      :label="$t(item.name)"
      :icon="item.meta.icon"
      :to="item.path"
    />
    <template #separator>
      <q-icon name="arrow_forward_ios" color="white" />
    </template>
  </q-breadcrumbs>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const router = useRouter()
const { t } = useI18n()

const items = ref([])

watch(() => {
  getRoute()
})

function getRoute() {
  items.value = router.currentRoute.value.matched.map((match) => {
    return {
      ...match,
      name: match.name ? `pages.${match.name}` : ""
    }
  })
}

const show = computed(() => validItems.value.length > 0)
const validItems = computed(() =>
  items.value.filter((item) => item.name != null && item.name != "")
)
</script>
